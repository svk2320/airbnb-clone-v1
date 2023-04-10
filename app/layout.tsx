import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/models/RegisterModal";
import LoginModal from "./components/models/LoginModal";
import SearchModal from "./components/models/SearchModal";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/models/RentModal";

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
