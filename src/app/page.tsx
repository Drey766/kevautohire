import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { Occasions } from "@/components/home/Occasions";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import { ClassTiles } from "@/components/home/ClassTiles";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { BusinessTravel } from "@/components/home/BusinessTravel";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { TaglineBand } from "@/components/home/TaglineBand";
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
      <BusinessTravel />
      <HowItWorksPreview />
      <TaglineBand />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
