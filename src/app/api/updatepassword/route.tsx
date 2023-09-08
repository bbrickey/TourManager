import bcrypt from "bcrypt";
import { prisma } from "../prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body.data;

  if (!email || !password) {
    return new NextResponse("missing fields", { status: 400 });
  }

  const exist = prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!exist) {
    throw new Error("user does not exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updateUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json(updateUser);
}
