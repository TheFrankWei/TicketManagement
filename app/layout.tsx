import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HouseLine, Ticket } from "@phosphor-icons/react/dist/ssr";
import { Provider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Management",
  description: "Ticket Management Exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <nav className="bg-zealthyNeutralSecondary py-5 w-full">
            <div className="flex flex-row justify-between gap-4 breakpoint-x">
              <div className="text-lg">Ticket Management Exercise</div>
              <div className="ml-auto flex flex-row gap-4">
                <Link href={"/"}>
                  <HouseLine
                    size={24}
                    className="hover:text-zealthySecondary"
                  />
                </Link>
                <Link href={"/admin"}>
                  <Ticket size={24} className="hover:text-zealthySecondary" />
                </Link>
              </div>
            </div>
          </nav>
          <div className="breakpoint-x">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
