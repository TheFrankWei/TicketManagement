"use client";
import { useEffect, useMemo, useState } from "react";
import Ticket from "./Ticket";
import { TicketPost, Ticket as TicketType, Status } from "@prisma/client";

export type ITicket = TicketType & { description: TicketPost[] };

export default function Admin() {
  const [tickets, setTickets] = useState<ITicket[]>();

  //   const [statusSortAsc, setStatusSorcAsc] = useState<boolean>(false);

  //   const memoizedTickets = useMemo(() => {
  //     const sortedTickets = tickets?.sort((a, b) => {
  //       const aStatus = a.description[0].status.charAt(0);
  //       const bStatus = b.description[0].status.charAt(0);
  //       if (statusSortAsc) {
  //         console.log(aStatus, bStatus)
  //         aStatus > bStatus ? -1 : 1;
  //         return 0;
  //       } else {
  //         aStatus > bStatus ? -1 : 1;
  //         return 0;
  //       }
  //     });
  //     return sortedTickets;
  //   }, [statusSortAsc, tickets]);

  //   console.log("memo", memoizedTickets);

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
      {/* <div>
        Sort By: Status
        <button onClick={() => setStatusSorcAsc(!statusSortAsc)}>
          {statusSortAsc ? "up" : "down"}
        </button>
      </div> */}
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
    </main>
  );
}
