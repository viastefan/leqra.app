import { NextResponse } from "next/server";
import { mockAnalyze } from "@/lib/mock-ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    text?: string;
    selectedSources?: string[];
  };

  return NextResponse.json(mockAnalyze(body.text ?? "", body.selectedSources ?? []));
}
