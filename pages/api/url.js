const { connectToDatabase } = require('../../lib/mongodb');

export default async function handler(req, res) {
    const url = req.body.url;
    if(!url) {
        res.status(422).send("NO URL PROVIDED")
    }

    const { db } = await connectToDatabase();

    await db.collection("urls").find({}).toArray(function(err, resp) {
        let id = resp[resp.length - 1].ref;
        db.collection("urls").insertOne({ ref: id + 1, url });
        let value = id + 1;
        res.status(200).json({ response: {
            status: 200,
            message: "url successfully shortened",
            value: "http://localhost:3000/" + value
        }});
    });
}