import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, Tours } from "@prisma/client";

type Tour = {
  data: {
    name: string;
    billing_type: string;
    start_date: string;
    end_date: string;
    region: string;
    bands?: string;
    notes?: string;
  };
};

export async function GET(request: Request) {
  const res = await prisma.tours.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  //console.log(res);

  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const data: Tour = await req.json();
  const startdateObj = new Date(data.data.start_date);
  const startDate = startdateObj.toISOString();
  const enddateObj = new Date(data.data.end_date);
  const endDate = startdateObj.toISOString();

  console.log(data);

  const result = await prisma.tours.create({
    data: {
      name: data.data.name,
      start_date: startDate,
      end_date: endDate,
      billing_type: data.data.billing_type,
      other_bands: data.data.bands,
      notes: data.data.notes,
      region: data.data.region,
    },
  });

  return NextResponse.json(data);
}
