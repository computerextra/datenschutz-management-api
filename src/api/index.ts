import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import auth from "./auth";
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
router.use("/auth", auth);

export default router;
