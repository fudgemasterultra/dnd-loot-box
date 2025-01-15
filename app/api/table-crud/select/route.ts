import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id }: Types.TableSelectRequest = await request.json();
  const table = await prisma.lootTable.findFirst({
    where: {
      id: id,
    },
  });
  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  const selectTables = await prisma.lootTable.findMany({
    where: {
      selected: true,
    },
  });
  for (let i = 0; i < selectTables.length; i++) {
    await prisma.lootTable.update({
      where: {
        id: selectTables[i].id,
      },
      data: {
        selected: false,
      },
    });
  }
  await prisma.lootTable.update({
    where: {
      id: id,
    },
    data: {
      selected: true,
    },
  });

  return NextResponse.json(table);
}
