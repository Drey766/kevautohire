import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/blog",
  title: "Blog",
  description: "Practical guides on airport transfers, wedding cars, choosing a luxury car and travelling in comfort from Nairobi.",
});

export default function BlogPage() {
  return (
    <>
      <PageHero title="The journal" lede="Practical guides for arriving well." />
      <section className="section section-white">
        <div className="container-site grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} level="h2" />
          ))}
        </div>
      </section>
    </>
  );
}
