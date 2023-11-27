import { Role } from "@prisma/client";
import MessageResponse from "./MessageResponse";

export default interface RoleResponse extends MessageResponse {
  role: Role | Role[] | null;
}
