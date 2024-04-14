"use client";
import { useEffect, useMemo, useState } from "react";
import Ticket from "./Ticket";
import { TicketPost, Ticket as TicketType, Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

export type ITicket = TicketType & { description: TicketPost[] };

export default function Admin() {
  const [statusSortAsc, setStatusSorcAsc] = useState<boolean>(false);
  // const [skip, setSkip] = useState<number>(0);
  // const take = 5;

  const getTickets = async () => {
    const res = await fetch("/api/admin"); //add ?skip=skip&take=take
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets, //pass in skip
  });

  const memoizedTickets = useMemo(() => {
    const sortedTickets = data?.data?.sort((a: ITicket, b: ITicket) => {
      const aDate = new Date(a?.createdAt).getTime();

      const bDate = new Date(b?.createdAt).getTime();
      if (statusSortAsc) {
        if (aDate < bDate) {
          return -1;
        } else if (aDate > bDate) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (aDate > bDate) {
          return -1;
        } else if (aDate < bDate) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return sortedTickets;
  }, [statusSortAsc, data]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-center">Error</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center pb-64">
      <div className="flex flex-row justify-between w-full">
        <div className="py-6 text-bold">Tickets</div>
        <div className="py-6 text-bold flex flex-row gap-2">
          <div>Sort By Date</div>
          <button onClick={() => setStatusSorcAsc(!statusSortAsc)}>
            {statusSortAsc ? <CaretUp size={24} /> : <CaretDown size={24} />}
          </button>
        </div>
      </div>
      {memoizedTickets?.map((ticket: ITicket) => (
        <Ticket
          key={ticket.id}
          id={ticket?.id}
          name={ticket?.name}
          email={ticket?.email}
          createdAt={ticket?.createdAt}
          description={ticket?.description}
          status={
            ticket?.description[ticket?.description.length - 1]?.status as Status
          }
        />
      ))}
      <div>{/*pagination stuff, map the total count/take for tabs*/}</div>
    </main>
  );
}
