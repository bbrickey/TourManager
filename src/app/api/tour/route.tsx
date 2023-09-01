import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";

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
/*
export async function GET(request: Request) {
  console.log("WERE TRYING");
  console.log("Request URL:", request.url);
  console.log("Received query:", request.query);
  const tourid = request.body;
  //const tourid = JSON.stringify(request.body);
  console.log("TourID " + tourid);
  /*
  const res = await prisma.tours.findUnique({
    where: {
      id: tourid,
    },
  });
  console.log("response" + res);

  return NextResponse.json("ok");
}
*/

export async function GET(req: Request, res: Response) {
  //console.log("WERE TRYING");

  //METHOD 1 - string manipulaiton
  //console.log("Request URL:", req.url);
  //console.log("Received query:", req.query);
  //const str = req.url;
  //const tourid = str?.split("=")[1]; //req.query not working??

  //METHOD 2 - search Params
  if (req.url) {
    //console.log("Request URL:", req.url);
    const { searchParams } = new URL(req.url!);
    const tourid = searchParams.get("tourid")?.toString();

    //console.log("TourID " + tourid);

    const result = await prisma.tours.findUnique({
      where: {
        id: tourid,
      },
      include: {
        events: true,
      },
    });
    //console.log("response" + result);

    //return res.json(result);
    //return NextResponse.json(res);
    return NextResponse.json(result);
  }

  return NextResponse.json(404);
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
