import { AVV } from "@prisma/client";
import MessageResponse from "./MessageResponse";

export default interface AvvResponse extends MessageResponse {
  avv: AVV | AVV[] | null;
}
