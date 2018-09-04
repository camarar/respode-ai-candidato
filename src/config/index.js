/**
 *
 * Arquivo: config/config.js
 * Data: 25/0//2018
 * Descrição: Arquivo responsável por manipular a configuração da nossa aplicação.
 * Author: Raphael Amaral
 *
 */

export default {
    "port": 80,
    //"mongoUrl": "mongodb://localhost:27017/respode-ai-candidato-api",
    "mongoUrl": "mongodb://camarar:ReSpOnDeAiCaNdIdAtO01@respode-ai-candidato-api-shard-00-00-p9ups.mongodb.net:27017,respode-ai-candidato-api-shard-00-01-p9ups.mongodb.net:27017,respode-ai-candidato-api-shard-00-02-p9ups.mongodb.net:27017/respode-ai-candidato-api?ssl=true&replicaSet=respode-ai-candidato-api-shard-0&authSource=admin&retryWrites=true",
    //"redisHost": "localhost",
    "redisHost": "redis-12496.c8.us-east-1-3.ec2.cloud.redislabs.com",    
    //"redisPort": 6379
    "redisPort": 12496,
    "redisPassword": "kKnVoC472kUbhY1KcTOqi1FkrOiodEjl"
}