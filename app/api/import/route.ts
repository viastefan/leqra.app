import { NextResponse } from "next/server";
import { mockImport } from "@/lib/mock-ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    sourceType?: string;
    sourceName?: string;
  };

  return NextResponse.json(
    mockImport(body.sourceName ?? "Quelle", body.sourceType ?? "Unbekannt"),
  );
}
