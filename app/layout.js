import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
  title: "SebaHub | Social Development Events",
  description:
    "Create, join and track social service events in your local area.",
};

const themeScript = `
  try {
    var t = localStorage.getItem("theme");
    if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
