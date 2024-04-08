import prisma from "@/lib/prisma";
import { TicketFormInput } from "../../page";
import { AdminTicketFormInput, Status } from "../../admin/Ticket";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const data: AdminTicketFormInput = await request.json();
  const {email, id, status, description } = data;
  try {
    const createTicketPost = await prisma.ticketPost.create({
      data: {
        description,
        status,
        ticketId: id,
      },
    });
    console.log(
      `email sent to ${email}.\nSubject: Thank you for reporting your issue!\nBody:\nThank you for reporting your issue!\nIssue:\n${description}`
    );
    return NextResponse.json(
      {
        data: createTicket,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
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
