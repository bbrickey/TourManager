import { z } from "zod";
import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

type Event = {
  data: {
    name: string;
    city_state: string;
    venue: string;
    date: string;
    all_ages: boolean;
    billing_type: string;
    bands?: string;
    attendance?: number;
    notes?: string;
    tour?: string;
  };
};

export async function GET(request: Request) {
  const res = await prisma.events.findMany({
    select: {
      name: true,
      id: true,
      tour_id: true,
    },
    orderBy: {
      event_date: "asc",
    },
  });

  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const data: Event = await req.json();
  const dateObj = new Date(data.data.date);
  const eventDate = dateObj.toISOString();

  //console.log(data);

  const result = await prisma.events.create({
    data: {
      name: data.data.name,
      location: data.data.city_state,
      venue: data.data.venue,
      event_date: eventDate,
      all_ages: data.data.all_ages,
      billing_type: data.data.billing_type,
      other_bands: data.data.bands,
      attendance: data.data.attendance,
      notes: data.data.notes,
      tour_id: data.data.tour,
    },
  });

  return NextResponse.json(result);
}
