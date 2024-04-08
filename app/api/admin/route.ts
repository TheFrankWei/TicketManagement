import prisma from "@/lib/prisma";
import { TicketFormInput } from "../../page";
import { Status } from "../../admin/Ticket";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
    };
    // const createTicket = await prisma.ticket.create({
    //   data: {
    //     name: rawFormData?.name,
    //     email: rawFormData?.email,
    //     description: {
    //       createMany: {
    //         data: [
    //           { status: Status.new, description: rawFormData?.description },
    //         ],
    //       },
    //     },
    //   },
    // });

    return NextResponse.json(
      {
        data: rawFormData,
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

export async function GET(request: Request) {
  try {
    const res = await prisma.ticket.findMany({
      // select: { id: true },
      include: {
        description: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    return NextResponse.json(
      {
        data: res,
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
