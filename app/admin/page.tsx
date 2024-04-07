import Image from "next/image";
import Ticket from "./Ticket";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="py-6 text-bold">Tickets</div>
      <Ticket />
      <div className="h-2 border-b-2 border-solid border-gray-500" />
    </main>
  );
}
