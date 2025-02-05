import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const tables = await prisma.lootTable.findMany();
  return NextResponse.json(tables);
}
