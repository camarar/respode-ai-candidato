/**
 *
 * Arquivo: routes/index.js
 * Data: 25/08/2018
 * Descrição: Arquivo responsável por manipular as rotas dos endpoints da API
 * Author: Raphael Amaral
 *
 */

import express from 'express';
import config from '../config';
import middleware from '../middleware';
import inicializacaoBd from '../db';
import candidato from '../controller/candidatoController';

let router = express();

// Conexao com a base de dados:
inicializacaoBd(db => {
    // Usaremos um middleware interno:
    router.use(middleware({ config, db }));

    // Aqui incluiremos as rotas de eleicao (/eleicao): rota default
    router.use('/2018', candidato({ config, db }));
});

export default router;


