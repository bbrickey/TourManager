import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url!);
  const query = searchParams.get("query")?.toString();
  console.log("query " + query);
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("response " + JSON.stringify(data));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Google Places API", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
