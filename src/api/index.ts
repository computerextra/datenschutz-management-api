import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import avv from "./avv";
import role from "./role";
import user from "./user";

const router = express.Router();

router.get<{}, MessageResponse>("/", (_, res) => {
  res.json({
    message: "Hello From API!",
  });
});

router.use("/user", user);
router.use("/avv", avv);
router.use("/role", role);

export default router;
