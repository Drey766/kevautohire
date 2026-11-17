import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { DraftBadge, SampleTag } from "@/components/ui/Tags";
import { carByRef } from "@/lib/data";
import type { BlogPost } from "@/types";

export function BlogCard({ post, level = "h3" }: { post: BlogPost; level?: "h2" | "h3" }) {
  const cover = carByRef(post.coverRef);
  const Heading = level;
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
        <SmartImage src={cover?.images[0]} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
        {cover?.sample && (
          <span className="absolute top-3 left-3">
            <SampleTag />
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-purple">
        <span className="font-normal">{post.category}</span>
        <DraftBadge status={post.status} />
      </div>
      <Heading className="mt-2 text-[1.4375rem]">
        <Link href={`/blog/${post.slug}`} className="hover:text-purple">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 text-base">{post.excerpt}</p>
    </article>
  );
}
