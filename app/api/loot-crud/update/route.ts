import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id, name, description }: Types.ItemUpdateRequest =
    await request.json();
  const lootItem = await prisma.lootItem.findUnique({
    where: {
      id,
    },
  });
  if (!lootItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  lootItem.name = name ?? lootItem.name;
  lootItem.description = description ?? lootItem.description;
  const updated = await prisma.lootItem.update({
    where: {
      id,
    },
    data: lootItem,
  });
  return NextResponse.json(updated);
}
