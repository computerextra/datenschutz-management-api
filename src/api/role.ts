import express from "express";
import { Request } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import RoleResponse from "../interfaces/RoleResponse";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
} from "../queries/role";

const errorMessage = (err: unknown): RoleResponse => {
  return {
    message: `ERROR: ${err}`,
    role: null,
  };
};

const router = express.Router();

router.get<{}, RoleResponse>("/all", async (_, res) => {
  try {
    const Role = await getAllRoles();
    res.json({
      message: "Success",
      role: Role,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.get<{ id: string }, RoleResponse>("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Role = await getRole({ id });
    res.json({
      message: "Success",
      role: Role,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

interface RoleProps {
  name: string;
}

interface RoleReq<T> extends Request {
  body: T;
}

router.post<{}, RoleResponse>("/new", async (req: RoleReq<RoleProps>, res) => {
  const name = req.body.name;
  try {
    const Role = await createRole({ name });
    res.json({
      message: "Success",
      role: Role,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.post<{ id: string }, RoleResponse>(
  "/:id",
  async (req: RoleReq<RoleProps>, res) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
      const Role = await updateRole({ id, name });
      res.json({
        message: "Success",
        role: Role,
      });
    } catch (err) {
      res.json(errorMessage(err));
    }
  },
);

router.post<{ id: string }, MessageResponse>(
  "/delete/:id",
  async (req, res) => {
    const id = req.params.id;
    try {
      await deleteRole({ id });
      res.json({
        message: `Successfully deleted Role: ${id}`,
      });
    } catch (err) {
      res.json(errorMessage(err));
    }
  },
);

export default router;
