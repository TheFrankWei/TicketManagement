"use client";
import { useEffect, useState } from "react";
import Ticket, { Status } from "./Ticket";
import { TicketPost, Ticket as TicketType } from "@prisma/client";

export type ITicket = TicketType & { description: TicketPost[] };

export default function Admin() {
  const [tickets, setTickets] = useState<ITicket[]>();
  useEffect(() => {
    fetch("/api/admin")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data?.data);
        setTickets(data?.data);
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="py-6 text-bold">Tickets</div>
      {tickets?.map((ticket: ITicket) => (
        <Ticket
          key={ticket.id}
          id={ticket?.id}
          name={ticket?.name}
          email={ticket?.email}
          description={ticket?.description[0]?.description}
          status={ticket?.description[0]?.status as Status}
        />
      ))}

      <div className="h-2 border-b-2 border-solid border-gray-500" />
    </main>
  );
}
