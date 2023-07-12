var MongoClient = require('mongodb').MongoClient;


const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27017;

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`


var client = MongoClient.connect(
    URLCluster,
    {
        useNewUrlParser: false
    },

    function (err, client) {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log("Connected successfully to server");

        //Specify the database to be used
        let db = client.db('test');

        //Specify the collection to be used
        let col = db.collection('users');

        //Insert a single document
        col.find()
            .then(function (docs) {
                console.log(docs);
            })
            .catch(function (err) {
                console.log(err);
            })
    });