/**
 *
 * Arquivo: model/candidato.js
 * Data: 25/08/2018
 * Descrição: Arquivo responsável pela classe de modelo do 'Candidato'
 * Author: Raphael Amaral
 *
 */

import mongoose from 'mongoose';
import Questionario from './questionario';

let Schema = mongoose.Schema;

/**
 *  Classe: Candidato
 * 
    id (gerado automaticamente via MongoDb - GUID)
    anoEleicao: String,
    abrangencia: String,
    nomeUnidadeEleitoral: String,
    cargo: String,
    numeroCandidato: String,
    nomeCompletoCandidato: String,
    nomeCandidato: String,
    vice: String,
    cpf: String,
    email: String,
    situacaoCandidatura: String,
    detalheSituacaoCandidatura: String,
    numeroPartido: String,
    siglaPartido: String,
    nomePartido: String,
    nomeColigacao: String,
    composicaoColigacao: String,
    nacionalidade: String,
    uf: String,
    municipio: String,
    dataNascimento: String,
    idadeDataPosse: String,
    tituloEleitoral: String,
    genero: String,
    grauInstrucao: String,
    estadoCivil: String,
    corRaca: String,
    ocupacao: String,
    declararBens: String,
    reeleicao: String,
    fonte: String,
    questionarios: objectId
 *  
 */

let CandidatoSchema = new Schema({
    anoEleicao: String,
    abrangencia: String,
    nomeUnidadeEleitoral: String,
    cargo: String,
    numeroCandidato: String,
    nomeCompletoCandidato: String,
    nomeCandidato: String,
    vice: String,
    cpf: String,
    email: String,
    situacaoCandidatura: String,
    detalheSituacaoCandidatura: String,
    numeroPartido: String,
    siglaPartido: String,
    nomePartido: String,
    nomeColigacao: String,
    composicaoColigacao: String,
    nacionalidade: String,
    uf: String,
    municipio: String,
    dataNascimento: String,
    idadeDataPosse: String,
    tituloEleitoral: String,
    genero: String,
    grauInstrucao: String,
    estadoCivil: String,
    corRaca: String,
    ocupacao: String,
    declararBens: String,
    reeleicao: String,
    fonte: String,
    questionarios: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Questionario'
     }]
});

export default mongoose.model('Candidato', CandidatoSchema);