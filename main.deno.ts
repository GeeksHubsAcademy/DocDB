import {
    MongoClient,
    ObjectId
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";



// Defining schema interface
interface UserSchema {
    _id: ObjectId;
    username: string;
    createdAt: number;
}


const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27017;

// const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`


// const client = new MongoClient();
// console.log("Connecting to MongoDB cluster");
// await client.connect(URLCluster);
// const users = await client.database("test").collection<UserSchema>("users")
// console.log("Connected to MongoDB cluster");



const URLReplicaLectura = `mongodb://${USER}:${PASS}@${HOST}:${27018}/?ssl=false&retryWrites=false&authMechanism=SCRAM-SHA-1&directConnection=true`

const client2 = new MongoClient();
console.log("Connecting to MongoDB replica");
await client2.connect(URLReplicaLectura);
const usersReplica = await client2.database("test").collection<UserSchema>("users")
console.log("Connected to MongoDB replica");


// const username = `user_${Math.random()}`;
// const createdAt = Date.now();

// const insertId = await users.insertOne({
//     username,
//     createdAt,
// });
// console.log({ username, createdAt });


// // // console.log({ insertId });

// // const foundById = await users.findOne({
// //     _id: insertId,
// // });

// // console.log({ foundById });



// const foundInTheReplica = usersReplica.findOne({
//     _id: insertId,
// })

// console.log({ foundInTheReplica });



// // read all users
// // const allUsers = await users.find();

// // allUsers.forEach((user) => console.log(user));

// // console.log(await allUsers.toArray());
