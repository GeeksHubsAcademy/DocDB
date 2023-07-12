// import mongo from "mongodb";
// const MongoClient = mongo.MongoClient;
const { MongoClient } = require('mongodb');



const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27017;

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`

// const URLReplicaLectura = `mongodb://${USER}:${PASS}@${HOST}:27018/?ssl=false&authMechanism=SCRAM-SHA-1&readPreference=secondary`



async function main() {

    const client = new MongoClient(URLCluster)

    console.log("Connecting to MongoDB cluster");

    await client.connect();
    console.log("Connected to MongoDB cluster");

}


main().catch(console.error);