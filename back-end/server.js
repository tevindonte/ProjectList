import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 9000;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.status(200).send("hello"))


app.listen(port, () => console.log(`Listening on port: ${port}`));