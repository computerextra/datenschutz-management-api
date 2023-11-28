import { User } from "@prisma/client";
import MessageResponse from "./MessageResponse";

type UserWithRole =
  | ({
      role: {
        id: string;
        name: string;
      };
    } & User)
  | null;

export default interface UserResponse extends MessageResponse {
  user: UserWithRole | User | User[] | null;
}
