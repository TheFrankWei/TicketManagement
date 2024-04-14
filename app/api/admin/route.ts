import prisma from "@/lib/prisma";
import { AdminTicketFormInput } from "../../admin/Ticket";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const skip = searchParams.get("skip");
  // const take = searchParams.get("take");
  try {
    //need to add prisma findCount for all entries to return total
    const res = await prisma.ticket.findMany({
      // skip: skip,
      // take: take,
      include: {
        description: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return NextResponse.json(
      {
        data: res,
        // total: comments above
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 400,
      }
    );
  }
}
