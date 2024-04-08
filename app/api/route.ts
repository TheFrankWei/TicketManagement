import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TicketFormInput } from "../page";
import { Status } from "../admin/Ticket";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const data: TicketFormInput = await request.json();
  const { name, email, description } = data;
  try {
    const createTicket = await prisma.ticket.create({
      data: {
        name,
        email,
        description: {
          createMany: {
            data: [{ status: Status.new, description: description }],
          },
        },
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
  const { searchParams } = new URL(request.url);
  const obj = Object.fromEntries(searchParams.entries());
  return NextResponse.json(
    { data: obj },
    {
      status: 200,
    }
  );
}
