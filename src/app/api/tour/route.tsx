import { z } from "zod";
import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, Tours } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //console.log("WERE TRYING");

  //METHOD 1 - string manipulaiton
  //console.log("Request URL:", req.url);
  //console.log("Received query:", req.query);
  //const str = req.url;
  //const tourid = str?.split("=")[1]; //req.query not working??

  //METHOD 2 - search Params
  if (req.url) {
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

    return res.json(result);
  }

  return res.json(404);
}
