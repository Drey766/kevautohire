import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { Occasions } from "@/components/home/Occasions";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import { ClassTiles } from "@/components/home/ClassTiles";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { LuxuryMeetsBusiness } from "@/components/home/LuxuryMeetsBusiness";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { StandOutBand } from "@/components/home/StandOutBand";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <Occasions />
      <FeaturedRail />
      <ClassTiles />
      <ServicesTrio />
      <LuxuryMeetsBusiness />
      <HowItWorksPreview />
      <StandOutBand />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
