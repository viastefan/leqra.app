import { NextResponse } from "next/server";
import { mockSearch } from "@/lib/mock-ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    query?: string;
  };

  return NextResponse.json(mockSearch(body.query ?? ""));
}
