import { User } from "@prisma/client";
import express, { Request } from "express";
import db from "../db";
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

interface AuthResponse extends MessageResponse {}

interface AuthProps {
  mail: string;
  password: string;
}

interface AuthRequest<T> extends Request {
  body: T;
}

router.post<{}, MessageResponse>("/", async (req: AuthRequest<{ id: string; token: string }>, res) => {
  const id = req.body.id;
  const token = req.body.token;

  try {
    const user = await db.user.findUnique({ where: { id } });
    if (user?.token === token) {
      res.send({
        message: "Auth",
      });
    } else {
      res.send({
        message: "SignIn",
      });
    }
  } catch (err) {
    res.send({
      message: `ERROR: ${err}`,
    });
  }
});

router.post<
  {},
  {
    message?: string | undefined;
    user?: User | undefined;
  }
>("/signIn", async (req: AuthRequest<AuthProps>, res) => {
  const mail = req.body.mail;
  const pass = req.body.password;
  try {
    const User = await db.user.findFirst({
      where: {
        mail: mail,
      },
    });
    if (User == null) {
      res.json({
        message: "No User Found",
      });
      return;
    }

    if (User.password === pass) {
      res.json({
        user: User,
      });
    } else {
      res.json({
        message: "Wrong Password",
      });
    }
  } catch (err) {
    res.json({
      message: `ERROR: ${err}`,
    });
  }
});

export default router;
