
import express from 'express';

const app = express()
const PORT = process.env.PORT || 3000;

import cors from 'cors';

app.use(cors())
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (req, res) => res.send("hello world"))

app.listen(PORT, () => {
    console.log(`[SERVER] listening on port ${PORT}...`)
})