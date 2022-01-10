import { decode, encode } from '../../global';

const { connectToDatabase } = require('../../lib/mongodb');

const sendResp = (id) => {
    let _url = "";
    if(process.env.NODE_ENV === "development") {
        _url = "http://localhost:3000/" + id;
    } else {
        _url = "https://smally.vercel.app/" + id;
    }
    const obj = {
        response: {
            status: 200,
            message: "url successfully shortened",
            value: _url
        }
    }
    return obj;
}

export default async function handler(req, res) {
    const url = req.body.url;
    if(!url) {
        res.status(200).send("NO URL PROVIDED")
    }

    const { db } = await connectToDatabase();

    await db.collection("urls").find({ url }).toArray(async (err, resp) => {
        if(resp.length) {
            const obj = sendResp(resp[0].ref);
            res.status(200).json(obj);
            return;
        } else {
            await db.collection("urls").find({}).toArray(async (err, resp) => {
                let id;
                if(resp.length === 0) {
                    id = 1000;
                    id = encode(id);
                } else {
                    id = encode(decode(resp[resp.length - 1].ref) + 1);
                }
                db.collection("urls").insertOne({ ref: id, url });
                let value = id;
                const obj = sendResp(value);
                res.status(200).json(obj);
            })
        }
    })
}