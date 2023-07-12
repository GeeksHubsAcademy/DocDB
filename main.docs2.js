// var MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'npm:mongodb';


const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27018;

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`


console.log("Connecting to MongoDB cluster");
let client = await MongoClient.connect(
    URLCluster,
    );

console.log(client);