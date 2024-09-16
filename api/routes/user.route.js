import express from "express";
import { test } from "../controllers/user.conroller.js";

const router = express.Router();

router.get("/", test);

export default router;
