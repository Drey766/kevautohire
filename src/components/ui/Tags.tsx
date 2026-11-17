import { brand } from "@/config/brand";
import { isDemoMode, showDraftFlags } from "@/lib/env";
import type { ContentStatus } from "@/types";

export function DraftBadge({ status = "draft" }: { status?: ContentStatus }) {
  if (!showDraftFlags || status !== "draft") return null;
  return <span className="badge-draft">{brand.copy.draftBadge}</span>;
}

export function SampleTag() {
  if (!isDemoMode) return null;
  return <span className="tag-sample">{brand.copy.sampleTag}</span>;
}

export function OwnFleetTag() {
  if (!isDemoMode) return null;
  return <span className="tag-own">{brand.copy.ownFleetTag}</span>;
}

/** The right tag for a car: sample, or the company's own fleet. */
export function CarTag({ sample }: { sample: boolean }) {
  return sample ? <SampleTag /> : <OwnFleetTag />;
}
