import db from "../db";

export async function getUser(input: { id: string }) {
  return await db.user.findUnique({
    where: {
      id: input.id,
    },
    include: {
      role: true,
    },
  });
}

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function createUser(input: { name: string; mail: string; password: string }) {
  const Gast = db.role.findUnique({
    where: {
      name: "Gast",
    },
  });
  if (Gast == null) {
    return await db.user.create({
      data: {
        name: input.name,
        mail: input.mail,
        password: input.password,
        role: {
          create: {
            name: "Gast",
          },
        },
      },
    });
  } else {
    return await db.user.create({
      data: {
        name: input.name,
        mail: input.mail,
        password: input.password,
        role: {
          connect: {
            name: "Gast",
          },
        },
      },
    });
  }
}

export async function updateUser(input: { id: string; name: string; mail: string | undefined }) {
  return await db.user.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      mail: input.mail,
    },
  });
}

export async function updateUserRole(input: { userId: string; roleId: string }) {
  return await db.user.update({
    where: {
      id: input.userId,
    },
    data: {
      roleId: input.roleId,
    },
  });
}

export async function deleteUser(input: { userId: string }) {
  return await db.user.delete({
    where: {
      id: input.userId,
    },
  });
}
