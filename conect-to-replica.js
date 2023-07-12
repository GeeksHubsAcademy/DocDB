// var MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'npm:mongodb';


const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27018;

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&retryWrites=false&replicaSet=rs0&readPreference=secondaryPreferred&authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true`;
console.log("Connecting to MongoDB cluster");
let client = await MongoClient.connect(
    URLCluster,
);

console.log("Connected to MongoDB cluster");
const users = client.db('test').collection('users');

console.time('find users to cluster endpoint');
let docs = await users.find().toArray();
console.timeEnd('find users to cluster endpoint');
console.log(docs.length);


const URLReplica = `mongodb://${USER}:${PASS}@${HOST}:${27018}/?ssl=false&retryWrites=false&replicaSet=rs0&readPreference=secondaryPreferred&authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true`;

console.log("Connecting to MongoDB replica");
const clientReplica = await MongoClient.connect(
    URLReplica,
);

console.log("Connected to MongoDB replica");
const usersReplica = clientReplica.db('test').collection('users');

console.time('find users to replica endpoint');
let docsReplica = await usersReplica.find().toArray();
console.timeEnd('find users to replica endpoint');
console.log(docsReplica.length);

console.log("Closing connections");
await client.close();
await clientReplica.close();
console.log("Connections closed");