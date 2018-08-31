/**
 *
 * Arquivo: controller/restauranteController.js
 * Data: 15/08/2018
 * Descrição: Arquivo responsável por manipular as rotas controllers dos endpoints do candidato.
 * Author: Raphael Amaral
 *
 */

import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';
import config from '../config';
import Candidato from '../model/candidato';
import Questionario from '../model/questionario';

let client = redis.createClient({
    port      : config.redisPort,              
    host      : config.redisHost
});

// Print redis errors to the console
client.on('error', (err) => {
    console.log("Error Redis:  " + err);
});

export default({ config, db }) => {
    let api = Router();

    // 1) Método (GET): Selecionar Todos os Candidatos: 'http://localhost:5000/eleicao/2018/candidato' QueryString ?cargo=:cargo

    api.get('/candidato', (req, res) => {
        if (req.query.cargo){
            console.log("QueryString");
            client.get(req.path + req.query.cargo, (error, result) => {
                if (result) {
                    res.json(JSON.parse(result));
                    console.log("Redis");
                } else{
                    Candidato.find({'cargo' : req.query.cargo}, (error, candidatos) => {
                        if (error) {
                            res.send('Erro ao selecionar os candidatos...: ' + error);
                        }
                        res.json(candidatos); 
                        console.log("MongoDB");
                        client.setex(req.path + req.query.cargo, 60, JSON.stringify(candidatos));
                    });
                }
            });
        } else{
            console.log("ALL");
            client.get(req.path + "all", (error, result) => {
                if (result) {
                    res.json(JSON.parse(result));
                    console.log("Redis");
                } else{
                    Candidato.find({}, (error, candidatos) => {
                        if (error) {
                            res.send('Erro ao selecionar os candidatos...: ' + error);
                        }
                        res.json(candidatos); 
                        console.log("MongoDB");
                        client.setex(req.path + "all", 60, JSON.stringify(candidatos));
                    });
                }
            });
        }   
    });

    // 2) Método (GET): Selecionar Candidato por Id: 'http://localhost:5000/eleicao/2018/candidato/:id'

    api.get('/candidato/:id', (req, res) => {

        client.get(req.path + req.params.id, (error, result) => {
            if (result) {
                res.json(JSON.parse(result));
                console.log("Redis");
            } else{
                Candidato.findById(req.params.id, (error, candidato) => {
                    if (error) {
                        res.send('Erro ao selecionar os candidatos...: ' + error);
                    }
                    res.json(candidato); 
                    console.log("MongoDB");
                    client.setex(req.path + req.params.id, 60, JSON.stringify(candidato));
                });
            }
        }); 
    });

    // 3) Método (POST): Cadastrar um Candidato: 'http://localhost:5000/eleicao/2018/candidato'
    api.post('/candidato', (req, res) => {
        let novoCandidato = new Candidato();

        novoCandidato.anoEleicao = req.body.anoEleicao;
        novoCandidato.abrangencia = req.body.abrangencia;
        novoCandidato.nomeUnidadeEleitoral = req.body.nomeUnidadeEleitoral;
        novoCandidato.cargo = req.body.cargo;
        novoCandidato.numeroCandidato = req.body.numeroCandidato;
        novoCandidato.nomeCompletoCandidato = req.body.nomeCompletoCandidato;
        novoCandidato.nomeCandidato = req.body.nomeCandidato;
        novoCandidato.vice = req.body.vice;
        novoCandidato.cpf = req.body.cpf;
        novoCandidato.email = req.body.email;
        novoCandidato.situacaoCandidatura = req.body.situacaoCandidatura;
        novoCandidato.detalheSituacaoCandidatura = req.body.detalheSituacaoCandidatura;
        novoCandidato.numeroPartido = req.body.numeroPartido;
        novoCandidato.siglaPartido = req.body.siglaPartido;
        novoCandidato.nomePartido = req.body.nomePartido;
        novoCandidato.nomeColigacao = req.body.nomeColigacao;
        novoCandidato.composicaoColigacao = req.body.composicaoColigacao;
        novoCandidato.nacionalidade = req.body.nacionalidade;
        novoCandidato.uf = req.body.uf;
        novoCandidato.municipio = req.body.municipio;
        novoCandidato.dataNascimento = req.body.dataNascimento;
        novoCandidato.idadeDataPosse = req.body.idadeDataPosse;
        novoCandidato.tituloEleitoral = req.body.tituloEleitoral;
        novoCandidato.genero = req.body.genero;
        novoCandidato.grauInstrucao = req.body.grauInstrucao;
        novoCandidato.estadoCivil = req.body.estadoCivil;
        novoCandidato.corRaca = req.body.corRaca;
        novoCandidato.ocupacao = req.body.ocupacao;
        novoCandidato.declararBens = req.body.declararBens;
        novoCandidato.reeleicao = req.body.reeleicao;
        novoCandidato.fonte = req.body.fonte;

        if (!req.body.cargo || !req.body.nomeCandidato || !req.body.numeroCandidato){
            res.set('Content-Type', 'application/json');
            res.status(400).json({message: "Erro ao tentar cadastrar o candidato."});
        }else{
            novoCandidato.save(error => {
                if(error) {
                    res.status(409).send('Erro ao tentar cadastrar o candidato...: ' + error);
                }
    
                res.json({ message: 'Candidato cadastrado com sucesso!' });
            });
        }
    });

    // 4) Método (PUT): Atualizar Candidatos por Id: 'http://localhost:5000/eleicao/2018/candidato/:id'
    api.put('/candidato/:id', (req, res) => {

        Candidato.findById(req.params.id, (error, candidato) => {
            if (error) {
                res.send('Erro ao selecionar o candidatos...: ' + error);      
            }

            candidato.anoEleicao = req.body.anoEleicao;
            candidato.abrangencia = req.body.abrangencia;
            candidato.nomeUnidadeEleitoral = req.body.nomeUnidadeEleitoral;
            candidato.cargo = req.body.cargo;
            candidato.numeroCandidato = req.body.numeroCandidato;
            candidato.nomeCompletoCandidato = req.body.nomeCompletoCandidato;
            candidato.nomeCandidato = req.body.nomeCandidato;
            candidato.vice = req.body.vice;
            candidato.cpf = req.body.cpf;
            candidato.email = req.body.email;
            candidato.situacaoCandidatura = req.body.situacaoCandidatura;
            candidato.detalheSituacaoCandidatura = req.body.detalheSituacaoCandidatura;
            candidato.numeroPartido = req.body.numeroPartido;
            candidato.siglaPartido = req.body.siglaPartido;
            candidato.nomePartido = req.body.nomePartido;
            candidato.nomeColigacao = req.body.nomeColigacao;
            candidato.composicaoColigacao = req.body.composicaoColigacao;
            candidato.nacionalidade = req.body.nacionalidade;
            candidato.uf = req.body.uf;
            candidato.municipio = req.body.municipio;
            candidato.dataNascimento = req.body.dataNascimento;
            candidato.idadeDataPosse = req.body.idadeDataPosse;
            candidato.tituloEleitoral = req.body.tituloEleitoral;
            candidato.genero = req.body.genero;
            candidato.grauInstrucao = req.body.grauInstrucao;
            candidato.estadoCivil = req.body.estadoCivil;
            candidato.corRaca = req.body.corRaca;
            candidato.ocupacao = req.body.ocupacao;
            candidato.declararBens = req.body.declararBens;
            candidato.reeleicao = req.body.reeleicao;
            candidato.fonte = req.body.fonte;

            candidato.save(error => {
                if(error) {
                    res.status(409).send('Erro ao tentar atualizar o candidato...: ' + error);   
                }    

                res.json({ message: 'Candidato atualizado com sucesso!' });
            });
        });       
    });

    // 5) Método: (DELETE): Deletar Candidato por Id: 'http://localhost:5000/eleicao/2018/candidato/:id'
    api.delete('/candidato/:id', (req, res) => {
        Candidato.remove({
            _id: req.params.id
        }, (error, candidato) => {
            if (error) {
                res.send('Erro ao tentar excluir o candidato...: ' + error);       
            }

            res.json({ message: 'Candidato excluído com sucesso!' });
        });
    });

    // 6) Método (POST): Adicionar uma Pergunta -> Candidato(Id): 'http://localhost:5000/eleicao/2018/candidato/:id/questionario'
    api.post('/candidato/:id/questionario', (req, res) => {
        Candidato.findById(req.params.id, (error, candidato) => {
            if (error) {
                res.send('Erro ao tentar localizar um questionario do Candidato...: ' + error);
            }

            let novaQuestao = new Questionario();

            novaQuestao.pergunta = req.body.pergunta;
            novaQuestao.resposta = req.body.resposta;
            novaQuestao.candidato = candidato._id;

            novaQuestao.save(error => {
                if (error) {
                    res.send('Erro ao tentar adicionar um questionario ao Candidato...: ' + error);
                }

                candidato.questionarios.push(novaQuestao);
                candidato.save(error => {
                    if (error) {
                        res.send('Erro ao tentar adicionar um questionario ao Candidato...: ' + error);
                    }

                    res.json({ message: 'Questionario do Candidato gravado com sucesso!' });
                });
            });
        });
    });

    // 7) Método (GET): Obter todas as perguntas -> Candidato(Id): 'http://localhost:5000/eleicao/2018/candidato/:id/questionario'
    api.get('/candidato/:id/questionario', (req, res) => {

        client.get(req.path + "all", (error, result) => {
            if (result) {
                res.json(JSON.parse(result));
                console.log("Redis");
            } else{
                Questionario.find({candidato : req.params.id}, (error, questionarios) => {
                    if (error) {
                        res.send('Erro ao selecionar os questionarios do Candidato...: ' + error);
                    }
                    res.json(questionarios); 
                    console.log("MongoDB");
                    client.setex(req.path + "all", 60, JSON.stringify(questionarios));
                });
            }

        });

        
    });

        // 8) Método (PUT): Adicionar uma Pergunta -> Candidato(Id): 'http://localhost:5000/eleicao/2018/candidato/:id/questionario/:idQ'
        api.put('/candidato/:id/questionario/:idQ', (req, res) => {

            Questionario.findById(req.params.idQ, (error, questionario) => {
                if (error) {
                    res.send('Erro ao tentar localizar um questionario do Candidato...: ' + error);
                }

                questionario.pergunta = req.body.pergunta;
                questionario.resposta = req.body.resposta;
    
                questionario.save(error => {
                    if (error) {
                        res.send('Erro ao tentar atualizar um questionario ao Candidato...: ' + error);
                    }
                    res.json({ message: 'Questionario do Candidato atualizado com sucesso!' });
                });
            });
        });

    return api;
}
