import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, description, lootTableId }: Types.ItemCreateRequest =
    await request.json();
  const table = await prisma.lootTable.findUnique({
    where: {
      id: lootTableId,
    },
  });
  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  const item = await prisma.lootItem.create({
    data: {
      name,
      description,
      lootTableId,
    },
  });
  return NextResponse.json(item);
}
