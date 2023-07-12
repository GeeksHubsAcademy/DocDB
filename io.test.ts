import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import {
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";




const USER = 'jperez'
const PASS = '9876ASadsasASDASDghfASD';
const HOST = 'localhost';
const PORT = 27017;

const URLCluster = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/?ssl=false&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1`
const client = new MongoClient();
await client.connect(URLCluster);
const users = await client.database("test").collection("users")





Deno.test('must start without docs', async () => {
    await users.deleteMany({})

    const allDocs = await users.find({}).toArray()

    assertEquals(allDocs.length, 0);

})


Deno.test('must insertMany 100_000 docs', async () => {

    const lotsOfDocs = Array.from({ length: 100_000 }, (_, i) => ({ name: `user_${i}` }))
    await users.insertMany(lotsOfDocs);
    const length = await users.count({});
    assertEquals(length, 100_000);
})

Deno.test('must insert 100 docs', async () => {

    const lotsOfDocs = Array.from({ length: 100 }, (_, i) => ({ name: `user_${i}` }))
    for (const doc of lotsOfDocs) {
        await users.insertOne(doc);
    }
    const length = await users.count({});
    assertEquals(length, 100_100);
})



Deno.test('must find 100_000 docs', async () => {
    const allDocs = await users.find({});
    // let i = 0;
    // for await (const doc of allDocs) {
    //     assertEquals(doc.name, `user_${i}`);
    //     i++;
    // }


});


Deno.test('must find and read 100_000 docs', async () => {
    const allDocs = await users.find({}).toArray()
    assertEquals(allDocs.length, 100_000);
});



Deno.test('insert 16Mb doc', { ignore: true }, async () => {
    const doc = {
        name: 'user_16Mb',
        data: Array.from({ length: 16_000_00 }, (_, i) => i)
    }
    await users.findAndModify({ query: { name: 'user_16Mb' }, update: doc, upsert: true })
    const length = await users.count({});
    assertEquals(length, 100_101);

});
