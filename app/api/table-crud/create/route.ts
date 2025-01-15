import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";

export async function POST(request: NextRequest) {
  const table: Types.TableCreateRequest = await request.json();
  console.log(table);
  const result = await prisma.lootTable.create({
    data: table,
  });
  return NextResponse.json(result);
}
