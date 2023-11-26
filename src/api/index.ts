import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import emojis from "./emojis";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Hello From API!",
  });
});

router.use("/emojis", emojis);

export default router;
