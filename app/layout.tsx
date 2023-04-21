import { Session } from "next-auth";
import { headers } from "next/headers";
import { ContextProvider } from "../context/context";
import { NavbarView } from "./components/navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import "react-toastify/dist/ReactToastify.css";

import AuthContext from "./AuthContext";
import { Footer } from "./components/footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContext session={session}>
          <ContextProvider>
            <NavbarView />
            {children}
            <Footer />
          </ContextProvider>
        </AuthContext>

        <Analytics />
      </body>
    </html>
  );
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.LOCAL_AUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}
