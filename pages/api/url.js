export default async function handler(req, res) {
    const url = req.body.url;
    if(!url) {
        res.status(422).send("NO URL PROVIDED")
    }
}