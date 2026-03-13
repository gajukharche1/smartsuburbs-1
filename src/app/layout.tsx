import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Digital Marketing Agency In Pune & Mumbai - Joh Dikhta Hai Woh Bikta Hai | Smart Suburbs",
  description: "Most Affordable Local Visibility Plan. Gold Plan — Google 1st Page Guarantee, 16 Local Social Media Posts, Featured Article + Lead Form, WhatsApp Button + 20 Photo Gallery. Trusted by 35,000+ Pune & Mumbai Businesses.",
  keywords: "digital marketing agency pune, digital marketing agency mumbai, hyperlocal marketing, local business directory, smart suburbs",
  openGraph: {
    title: "Smart Suburbs - Digital Marketing Agency In Pune & Mumbai",
    description: "Most Affordable Local Visibility Plan. Google 1st Page Guarantee. Trusted by 35,000+ Businesses.",
    type: "website",
    url: "https://smartsuburbs.in",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script: sets theme BEFORE paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('ss-theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

