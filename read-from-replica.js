// var MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'npm:mongodb';


const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27017;

const DB = 'test';
const COLLECTION = 'TESTING';

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&retryWrites=false&replicaSet=rs0&readPreference=secondaryPreferred&authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true`;
console.log("Connecting to MongoDB cluster");
let client = await MongoClient.connect(
    URLCluster,
);

console.log("Connected to MongoDB cluster");
const collection = client.db(DB).collection(COLLECTION);

const docToInsert = {
    creation_at: new Date(),

}
console.log('inserting:', { docToInsert });

console.time('write to cluster endpoint');
let doc = await collection.insertOne(docToInsert);
console.timeEnd('write to cluster endpoint');
console.log(doc);


const URLReplica = `mongodb://${USER}:${PASS}@${HOST}:${27018}/?ssl=false&retryWrites=false&replicaSet=rs0&readPreference=secondaryPreferred&authSource=admin&authMechanism=SCRAM-SHA-1&directConnection=true`;

console.log("Connecting to MongoDB replica");
const clientReplica = await MongoClient.connect(
    URLReplica,
);

console.log("Connected to MongoDB replica");
const collectionReplica = clientReplica.db(DB).collection(COLLECTION);

console.time('read from replica endpoint');
let docsReplica = await collectionReplica.find({ _id: doc.insertedId }).toArray();
console.timeEnd('read from replica endpoint');
console.log(docsReplica);

console.log("Closing connections");
await client.close();
await clientReplica.close();
console.log("Connections closed");