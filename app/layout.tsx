import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/ClientOnly";
// import Model from "./components/models/Model";
import RegisterModal from "./components/models/RegisterModal";

import "./globals.css";

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          {/* <Model actionLabel="Submit" title="Model" isOpen /> */}
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
