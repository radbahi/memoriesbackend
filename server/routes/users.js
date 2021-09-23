import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();

// /user is used in the server index.js

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
