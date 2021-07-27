import express from "express"; //for routing
import mongoose from "mongoose"; //create models
import cors from "cors"; //enables cross origin requests

//adding "type": "module" in package.json allows us to use ES6 syntax

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
