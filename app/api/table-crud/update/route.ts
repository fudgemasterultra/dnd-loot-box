import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";

export async function POST(request: NextRequest) {
  const { id, name, description }: Types.TableUpdateRequest =
    await request.json();
  const table = await prisma.lootTable.findUnique({
    where: { id },
  });

  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  table.name = name ?? table.name;
  table.description = description ?? table.description;
  const result = await prisma.lootTable.update({
    where: { id },
    data: table,
  });
  return NextResponse.json(result);
}
