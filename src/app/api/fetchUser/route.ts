import { NextRequest, NextResponse } from "next/server";

interface DataItem {
  name: string;
  [key: string]: any;
}

export async function GET(req: NextRequest) {
  const { API_URL, API_USERNAME, API_PASSWORD } = process.env;

  if (!API_URL || !API_USERNAME || !API_PASSWORD) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  const headers = new Headers();
  const encodedCredentials = Buffer.from(
    `${API_USERNAME}:${API_PASSWORD}`
  ).toString("base64");
  console.log("creds", encodedCredentials);
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString("base64")
  );

  try {
    const response = await fetch(API_URL as string, { headers });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data: DataItem[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
