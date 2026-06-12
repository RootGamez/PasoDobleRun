import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { site } from "@/data/site";
import "@/styles/globals.css";

const sora = localFont({
  src: "../fonts/sora-variable.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

const inter = localFont({
  src: "../fonts/inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "VE",
  },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
        </LenisProvider>
      </body>
    </html>
  );
}
