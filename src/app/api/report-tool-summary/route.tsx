import { prisma } from "../prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  if (req.url) {
    const { searchParams } = new URL(req.url!);
    const urlString = searchParams.get("start")?.toString();
    const start = urlString?.slice(0, urlString.indexOf("end"));
    const end = urlString?.slice(urlString.indexOf("=") + 1);

    const result = await prisma.accountLedger.groupBy({
      by: ["account_type"],
      where: {
        created_at: {
          lte: new Date(end!).toISOString(),
          gte: new Date(start!).toISOString(),
        },
      },
      _sum: {
        value: true,
      },
    });

    return NextResponse.json(result);
  }

  return NextResponse.json(404);
}
