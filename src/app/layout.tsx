import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import { Box, Container } from "@mui/material";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
            <Container>
              <AppHeader />
              {children}
            </Container>
            <Footer />
          </Box>
        </QueryProvider>
      </body>
    </html>
  );
}
