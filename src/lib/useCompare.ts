"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "imtalii-compare";
const EVENT = "imtalii-compare-change";
export const COMPARE_MAX = 3;
const EMPTY: string[] = [];

let cacheRaw: string | null = null;
let cacheList: string[] = EMPTY;

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cacheRaw) return cacheList;
    cacheRaw = raw;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cacheList = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string").slice(0, COMPARE_MAX) : EMPTY;
    return cacheList;
  } catch {
    return cacheList;
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage blocked (private mode): compare simply won't persist.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCompare() {
  const slugs = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = useCallback((slug: string) => {
    const now = read();
    if (now.includes(slug)) write(now.filter((s) => s !== slug));
    else if (now.length < COMPARE_MAX) write([...now, slug]);
  }, []);

  const remove = useCallback((slug: string) => write(read().filter((s) => s !== slug)), []);
  const clear = useCallback(() => write([]), []);

  return { slugs, toggle, remove, clear, isFull: slugs.length >= COMPARE_MAX };
}
