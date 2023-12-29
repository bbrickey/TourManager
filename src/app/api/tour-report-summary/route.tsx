import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  if (req.url) {
    //console.log("Trying");
    const { searchParams } = new URL(req.url!);
    const tourid = searchParams.get("tourid")?.toString();
    //console.log("tour id " + tourid);

    const result = await prisma.accountLedger.groupBy({
      by: ["category"],
      where: {
        tour_id: tourid,
      },
      _sum: {
        value: true,
      },
    });
    return NextResponse.json(result);
  }

  return NextResponse.json(404);
}
