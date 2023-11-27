import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import user from "./user";

const router = express.Router();

router.get<{}, MessageResponse>("/", (_, res) => {
  res.json({
    message: "Hello From API!",
  });
});

router.use("/user", user);

export default router;
