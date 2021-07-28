import express from "express"; //for routing
import mongoose from "mongoose"; //create models
import cors from "cors"; //enables cross origin requests
import dotenv from "dotenv"; //MAKE SURE .env IS IN .gitignore
import postRoutes from "./routes/posts.js";

dotenv.config();

//adding "type": "module" in package.json allows us to use ES6 syntax

const app = express();

app.use("/posts", postRoutes);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

//remember that mongoose returns promises so use .then
mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false); //just makes sure we don't get warning in console
