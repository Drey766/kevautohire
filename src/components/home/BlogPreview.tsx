import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { posts } from "@/lib/data";

export function BlogPreview() {
  return (
    <section className="section section-mist">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-section">From the journal</h2>
          <Link href="/blog" className="link inline-flex min-h-11 items-center">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
          {posts.slice(0, 3).map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
