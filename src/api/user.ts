import express, { Request } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import UserResponse from "../interfaces/UserResponse";
import { createUser, deleteUser, getAllUsers, getUser, updateUser, updateUserRole } from "../queries/user";

const errorMessage = (err: unknown): UserResponse => {
  return {
    message: `ERROR: ${err}`,
    user: null,
  };
};

const router = express.Router();

router.get<{}, UserResponse>("/all", async (_, res) => {
  try {
    const User = await getAllUsers();

    res.json({
      message: "Success",
      user: User,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.get<{ id: string }, UserResponse>("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const User = await getUser({ id });
    res.json({
      message: "Success",
      user: User,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

interface UserProps {
  name: string;
  mail: string;
  password: string;
}

interface UserReq<T> extends Request {
  body: T;
}

router.post<{}, UserResponse>("/new", async (req: UserReq<UserProps>, res) => {
  const Name = req.body.name;
  const Mail = req.body.mail;
  const password = req.body.password;
  try {
    const User = await createUser({ name: Name, mail: Mail, password });
    res.json({
      message: "Success",
      user: User,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.post<{ id: string }, UserResponse>("/:id", async (req: UserReq<UserProps>, res) => {
  const id = req.params.id;
  const Name = req.body.name;
  const Mail = req.body.mail;
  try {
    const User = await updateUser({ id: id, name: Name, mail: Mail });
    res.json({
      message: "Success",
      user: User,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

interface RoleUpdateProp {
  roleId: string;
}

router.post<{ id: string }, UserResponse>("/role/:id", async (req: UserReq<RoleUpdateProp>, res) => {
  const userId = req.params.id;
  const roleId = req.body.roleId;
  try {
    const User = await updateUserRole({ userId, roleId });
    res.json({
      message: "Success",
      user: User,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.post<{ id: string }, MessageResponse>("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser({ userId: id });
    res.json({
      message: `Successfully deleted User: ${req.params.id}`,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

export default router;
