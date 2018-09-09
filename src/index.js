/**
 *
 * Arquivo: index.js
 * Data: 25/08/2018
 * Descrição: Arquivo responsável pela execução da API.
 * Author: Raphael Amaral
 *
 */

// Importar alguns pacotes para o nosso projeto:

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// Middleware:

// Configuração do Parser (application/json):
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da Autenticação:


// Rotas da API Eleicao (/eleicao):
app.use('/eleicao', routes);

//app.server.listen(config.port);
app.server.listen(process.env.PORT);
//console.log(`Aplicação sendo executada na porta ${app.server.address().port}`);
console.log(`Aplicação sendo executada na porta ${process.env.PORT}`);


export default app;
