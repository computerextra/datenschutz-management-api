import express, { Request } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import AvvResponse from "../interfaces/AvvResponse";
import {
  approveAvv,
  createAvv,
  getAllAvv,
  getAvv,
  updateAvv,
  updateAvvComment,
} from "../queries/avv";

interface AvvProps {
  kundenname: string;
  kundennummer: string;
  vertrag: string;
}

interface AvvReq<T> extends Request {
  body: T;
}

interface All extends MessageResponse {
  avv:
    | {
        id: string;
        kundennummer: string;
        kundenname: string;
        kommentar: string | null;
        freigegeben: boolean;
      }[]
    | null;
}
const errorMessage = (err: unknown): AvvResponse => {
  return {
    message: `ERROR: ${err}`,
    avv: null,
  };
};

const router = express.Router();

router.get<{}, All>("/", async (_, res) => {
  try {
    const AVV = await getAllAvv();
    res.json({
      message: "Success",
      avv: AVV,
    });
  } catch (err) {
    res.json({
      message: `ERROR: ${err}`,
      avv: null,
    });
  }
});

router.get<{ id: string }, AvvResponse>("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const avv = await getAvv({ id });
    res.json({
      message: "Success",
      avv: avv,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.post<{}, AvvResponse>("/new", async (req: AvvReq<AvvProps>, res) => {
  const kundenname = req.body.kundenname;
  const kundennummer = req.body.kundennummer;
  const vertrag = req.body.vertrag;
  try {
    const avv = await createAvv({ kundennummer, kundenname, vertrag });
    res.json({
      message: "Success",
      avv: avv,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

router.post<{ id: string }, AvvResponse>(
  "/:id",
  async (req: AvvReq<AvvProps>, res) => {
    const id = req.params.id;
    const kundenname = req.body.kundenname;
    const kundennummer = req.body.kundennummer;
    const vertrag = req.body.vertrag;
    try {
      const avv = await updateAvv({ id, kundennummer, kundenname, vertrag });
      res.json({
        message: "Success",
        avv: avv,
      });
    } catch (err) {
      res.json(errorMessage(err));
    }
  },
);

router.post<{ id: string }, AvvResponse>(
  "/:id/comment",
  async (req: AvvReq<{ comment: string }>, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    try {
      const avv = await updateAvvComment({ id, comment });
      res.json({
        message: "Success",
        avv: avv,
      });
    } catch (err) {
      res.json(errorMessage(err));
    }
  },
);

router.post<{ id: string }, AvvResponse>("/:id/approve", async (req, res) => {
  const id = req.params.id;
  try {
    const avv = await approveAvv({ id });
    res.json({
      message: "Success",
      avv: avv,
    });
  } catch (err) {
    res.json(errorMessage(err));
  }
});

export default router;
