import db from "../db";

export async function createAvv(input: { kundennummer: string; kundenname: string; vertrag: string }) {
  return db.aVV.create({
    data: {
      kundenname: input.kundenname,
      kundennummer: input.kundennummer,
      vertrag: input.vertrag,
    },
  });
}

export async function getAvv(input: { id: string }) {
  return await db.aVV.findUnique({
    where: {
      id: input.id,
    },
  });
}

export async function getAllAvv() {
  return await db.aVV.findMany({
    select: {
      id: true,
      kundennummer: true,
      kundenname: true,
      kommentar: true,
      freigegeben: true,
    },
  });
}

export async function updateAvv(input: { id: string; kundennummer: string; kundenname: string; vertrag: string }) {
  return await db.aVV.update({
    where: {
      id: input.id,
    },
    data: {
      kundenname: input.kundenname,
      kundennummer: input.kundennummer,
      vertrag: input.vertrag,
      freigegeben: false,
      freigegeben_am: undefined,
    },
  });
}

export async function updateAvvComment(input: { id: string; comment: string }) {
  return await db.aVV.update({
    where: {
      id: input.id,
    },
    data: {
      kommentar: input.comment,
    },
  });
}

export async function approveAvv(input: { id: string }) {
  return await db.aVV.update({
    where: {
      id: input.id,
    },
    data: {
      freigegeben: true,
      freigegeben_am: new Date(),
    },
  });
}
