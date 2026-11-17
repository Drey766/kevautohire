import type { Metadata, Viewport } from "next";
import { Marcellus, Outfit } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";
import { siteUrl } from "@/lib/env";
import { jsonLd, autoRentalSchema } from "@/lib/schema";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppPill } from "@/components/layout/WhatsAppPill";

const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400", display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: brand.seo.defaultTitle, template: brand.seo.titleTemplate },
  description: brand.seo.description,
  openGraph: { siteName: brand.fullName, locale: "en_KE", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: brand.colors.aubergine };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${marcellus.variable} ${outfit.variable}`} style={themeVars}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(autoRentalSchema())} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <WhatsAppPill />
      </body>
    </html>
  );
}
