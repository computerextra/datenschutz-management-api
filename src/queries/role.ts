import db from "../db";

export async function getRole(input: { id: string }) {
  return await db.role.findUnique({
    where: {
      id: input.id,
    },
  });
}

export async function getAllRoles() {
  return await db.role.findMany();
}

export async function createRole(input: { name: string }) {
  return await db.role.create({
    data: {
      name: input.name,
    },
  });
}

export async function updateRole(input: { id: string; name: string }) {
  return await db.role.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
    },
  });
}

export async function deleteRole(input: { id: string }) {
  return await db.role.delete({
    where: {
      id: input.id,
    },
  });
}
