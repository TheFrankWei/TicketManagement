"use client";
import { useEffect, useState } from "react";
import { fetchTickets } from "../actions";
import Ticket from "./Ticket";
import { Ticket as TicketType } from "@prisma/client";

export default function Admin({ props }: { props: any }) {
  const [tickets, setTickets] = useState<any>([]);
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
      {tickets?.map((ticket) => (
        <Ticket
          key={ticket.id}
          id={ticket?.id}
          description={ticket?.description[0]?.description}
          status={ticket?.description[0]?.status}
        />
      ))}

      <div className="h-2 border-b-2 border-solid border-gray-500" />
    </main>
  );
}
