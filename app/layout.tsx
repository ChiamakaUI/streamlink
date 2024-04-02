import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import QueryContext from "@/context/QueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamLink",
  description: "Live auction for vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <AuthContext>
            <QueryContext>{children}</QueryContext>
          </AuthContext>
        </UserProvider>
      </body>
    </html>
  );
}
