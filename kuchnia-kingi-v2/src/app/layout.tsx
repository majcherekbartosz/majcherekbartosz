import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kuchnia Kingi",
  description: "Kulinarny pamiętnik Kingi – przepisy, lista zakupów i ulubione dania.",
};

export const viewport: Viewport = {
  themeColor: "#FF85A1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh bg-surface font-sans text-on-surface">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#fff5f8',
              border: '1px solid #ffb8ce',
              color: '#1F1A1C',
            },
          }}
        />
      </body>
    </html>
  );
}
