require("dotenv").config();
const express = require("express");
const db = require("./models/database/db");
const cors = require('cors')

const app = express();
const port = 3001;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS; 

db(dbUrl, dbUser, dbPass, "ToDoApp");

app.use(express.json());
app.use(cors())
app.use("/tarefas", require("./routes/tarefas.routes"));

app.listen(process.env.PORT || port, () =>
    console.log(`http://localhost:${port}`)
);