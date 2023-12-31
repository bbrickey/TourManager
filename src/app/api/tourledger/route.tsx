import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";

/*
type FormData = {
  userInput: {
    accountType: string;
    category: string;
    subcategory: string;
    value: number;
    tour: string;
    event: string;
    notes: string;
  }[];
};
*/

export async function GET(req: Request, res: Response) {
  if (req.url) {
    console.log("Trying");
    const { searchParams } = new URL(req.url!);
    const tourid = searchParams.get("tourid")?.toString();
    console.log("tour id " + tourid);

    const result = await prisma.accountLedger.findMany({
      where: {
        tour_id: tourid,
      },
    });
    return NextResponse.json(result);
  }

  return NextResponse.json(404);
}
/*
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.url) {
    const { searchParams } = new URL(req.url!);
    const tourid = searchParams.get("tourid")?.toString();

    const result = await prisma.accountLedger.findMany({
      where: {
        tour_id: tourid,
      },
    });
    return res.json(result);
  }

  return res.json(404);
}
*/

/*
export async function POST(req: Request) {
  try {
    console.log("TRYING ");
    const rawRequestBody = await req.text();
    console.log("Raw request body:", rawRequestBody);
    const data: FormData = JSON.parse(rawRequestBody);
    console.log("Parsed data:", data);

    for (let i = 0; i < data.userInput.length; i++) {
      console.log("Attempt number: " + i);
      const entry = await prisma.accountLedger.create({
        data: {
          account_type: data.userInput[i].accountType,
          category: data.userInput[i].category,
          subcategory: data.userInput[i].subcategory,
          value: data.userInput[i].value,
          tour_id: data.userInput[i].tour,
          event_id: data.userInput[i].event,
          notes: data.userInput[i].notes,
        },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Bad Request", { status: 400 });
  }

}
  */
