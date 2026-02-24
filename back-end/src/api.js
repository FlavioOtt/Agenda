const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors({origin: "http://localhost:3001", credentials: true}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//====================== Rotas  =======================
const route = require("./routers/route");
const categoria = require("./routers/categoria")

app.use("/", route);
app.use("/categoria", categoria);

module.exports = app;

