import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/navbar.component";
import ClientOnly from "./components/ClientOnly";
// import Model from "./components/models/Model";
import RegisterModal from "./components/models/RegisterModal";
import LoginModal from "./components/models/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";

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
          {/* <Model actionLabel="Submit" title="Model" isOpen /> */}
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
