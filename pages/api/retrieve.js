const { connectToDatabase } = require('../../lib/mongodb');

export default async function handler(req, res) {
    const ref = req.body.ref;
    if(!ref) {
        res.status(200).json({ response: {
            status: 422,
            message: "no ref provided"
        }});
    }

    const { db } = await connectToDatabase();

    await db.collection("urls").find({ ref: parseInt(ref) }).toArray((err, resp) => {
        if(resp.length) {
            res.status(200).json({ response: {
                status: 200,
                message: "URL found",
                value: resp[0].url
            }});
        } else {
            res.status(200).json({ response: {
                status: 404,
                message: "URL not found",
            }});
        }
    })
}