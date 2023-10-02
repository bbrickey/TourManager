import { z } from "zod";
import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const res = await prisma.events.findMany({
    where: {
      tour_id: null,
    },
    orderBy: {
      event_date: "asc",
    },
  });

  return NextResponse.json(res);
}
