import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id }: Types.TableDeleteRequest = await request.json();
  const deleted = await prisma.lootTable.delete({
    where: {
      id,
    },
  });
  if (!deleted) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }
  return NextResponse.json(deleted);
}
