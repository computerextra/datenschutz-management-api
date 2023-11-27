import { User } from "@prisma/client";
import MessageResponse from "./MessageResponse";

export default interface UserResponse extends MessageResponse {
  user: User | User[] | null;
}
