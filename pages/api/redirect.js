const { connectToDatabase } = require('../../lib/mongodb');

export default async function handler(req, res) {
    const ref = req.body.ref;
    if(!ref) {
        res.status(422).send("NO REF PROVIDED")
    }
    
    const { db } = await connectToDatabase();

    await db.collection("urls").find({ ref: parseInt(ref) }).toArray(function(err, resp) {

        res.status(200).json({ response: {
            status: 200,
            message: "Ref Found!",
            value: resp[0].url
        }});
    });
}