import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";
import { getPost, posts } from "@/lib/data";
import { formatPostDate } from "@/lib/format";
import { articleSchema, jsonLd } from "@/lib/schema";

// Every valid page is known at build time; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({ path: `/blog/${post.slug}`, title: post.title, description: post.excerpt, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema(post))} />
      <PageHero eyebrow={post.category} title={post.title} lede={post.excerpt}>
        <p className="tabular mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span>{formatPostDate(post.created_at)}</span>
          <span>{post.read_time} min read</span>
          <DraftBadge status={post.status} />
        </p>
      </PageHero>

      <section className="section section-white">
        <div className="container-site">
          {/* Authored in src/data/blog.json, never user input. */}
          <article className="prose-blog mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="prose-blog mx-auto mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-primary">
              {brand.copy.bookCta}
            </Link>
            <Link href="/fleet" className="btn btn-ghost">
              {brand.copy.fleetCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container-site">
          <h2 className="h-section">Keep reading</h2>
          <div className="mt-9 grid gap-10 md:grid-cols-3 md:gap-6">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
