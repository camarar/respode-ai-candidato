/**
 *
 * Arquivo: model/questionario.js
 * Data: 25/08/2018
 * Descrição: Arquivo responsável pela classe de modelo de 'Questionario'
 * Author: Raphael Amaral
 *
 */

import mongoose from 'mongoose';
import Candidato from './candidato';

let Schema = mongoose.Schema;

/**
 *  Classe: Questionario
 * 
    id (gerado automaticamente via MongoDb - GUID)
    pergunta: String,
    resposta: String,
    candidato: objectId
 *  
 */
let QuestionarioSchema = new Schema({
    pergunta: String,
    resposta: String,
    candidato: {
        type: Schema.Types.ObjectId,
        ref: 'Candidato',
        required: true
    }
});

export default mongoose.model('Questionario', QuestionarioSchema);
