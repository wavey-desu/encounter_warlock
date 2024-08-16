// react/next
import type { Metadata } from "next";
import {ReactNode} from "react";
// styles
import {Inter, Montserrat, Roboto} from "next/font/google";
import "./globals.css";
// component imports
import MainLayout from "@/app/components/layout/MainLayout";
// state mgmt.
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ["latin"] });
// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: 'variable'
// })
//
// const roboto = Roboto({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "EncounterWarlock",
  description: "DnD 5e Encounter tool and stats tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
