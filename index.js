
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

import taskRoutes from "./routes/taskRoutes.js";
app.use("/tasks", taskRoutes)

app.get('/', (req, res) => res.send("hello world"))


app.use((error, req, res, next) => {
    res.status(500).json({
        message: "Internal Server Error"
    })
})

app.listen(PORT, () => {
    console.log(`[SERVER] listening on port ${PORT}...`)
})