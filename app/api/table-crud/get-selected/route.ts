import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";

export async function GET(request: NextRequest) {
  const table = await prisma.lootTable.findFirst({
    where: {
      selected: true,
    },
  });
  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  const lootItems = await prisma.lootItem.findMany({
    where: {
      lootTableId: table.id,
    },
  });
  return NextResponse.json(lootItems);
}
