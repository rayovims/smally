const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    const url = req.body.url;
    if(!url) {
        res.status(422).send("NO URL PROVIDED")
    }

    const { db } = await connectToDatabase();
    // logic to handle new URL. BUT CONNECT TO DB NOW
    const postURL = await db.collection("urls").insertOne({url})

    console.log("RESP =", postURL)
    res.status(200).json({ url: url })
}