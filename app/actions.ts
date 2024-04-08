"use server";
import prisma from "@/lib/prisma";
import { TicketFormInput } from "./page";
import { Status } from "./admin/Ticket";



export async function createTicket(formData: TicketFormInput) {

  const createTicket = await prisma.ticket.create({
    data: {
      name: formData?.name,
      email: formData.email,
      description: {
        createMany: {
          data: [{ status: Status.new, description: formData.description }],
        },
      },
    },
  });
  console.log(createTicket, "test");
}

export async function fetchTickets() {
  "use server";
  const post = await prisma.ticketPost.findMany();
  return {
    props: post,
  };
}
