"use client";

import { useSyncExternalStore } from "react";
import { nairobiNow } from "@/lib/booking";

const noop = () => () => {};

/** Current Nairobi time for `min` attributes. Undefined during SSR, so there is no hydration mismatch. */
export function useNairobiNow(): string | undefined {
  return useSyncExternalStore(noop, () => nairobiNow(), () => undefined);
}
