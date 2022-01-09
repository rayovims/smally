const { connectToDatabase } = require('../../lib/mongodb');

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    await db.collection("urls").find({}).toArray((err, resp) => {
        res.status(200).json({ clicks: resp.length - 1 })
    })
}