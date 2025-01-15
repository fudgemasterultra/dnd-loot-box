import { NextRequest, NextResponse } from "next/server";
import { Types } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id }: Types.ItemDeleteRequest = await request.json();
  const item = await prisma.lootItem.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(item);
}
