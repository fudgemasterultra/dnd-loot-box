import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id }: Types.TableReadRequest = await request.json();
  const table = await prisma.lootTable.findUnique({
    where: {
      id,
    },
  });
  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  const lootItems = await prisma.lootItem.findMany({
    where: {
      lootTableId: id,
    },
  });
  return NextResponse.json({ table, lootItems });
}
