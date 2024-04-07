import Image from "next/image";
import Ticket from "./Ticket";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Tickets</div>
      <Ticket />
    </main>
  );
}
