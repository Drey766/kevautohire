"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu } from "lucide-react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useCompare } from "@/lib/useCompare";
import { cn } from "@/lib/cn";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const { slugs } = useCompare();

  const isActive = (href: string) => (href === "/services" ? pathname === "/services" || (pathname.startsWith("/services/") && pathname !== "/services/weddings") : pathname === href || pathname.startsWith(`${href}/`));
  const linkClass = (active: boolean) =>
    cn("relative inline-flex min-h-11 items-center px-1 text-[0.9375rem] font-normal transition-colors", scrolled ? (active ? "text-primary" : "text-ink hover:text-primary") : active ? "text-white" : "text-soft hover:text-white");

  return (
    // Sticky with a matching negative margin: the page's dark header sits behind the transparent bar.
    <header className={cn("sticky top-0 z-40 -mb-[var(--nav-h)] h-[var(--nav-h)] transition-[background-color,box-shadow] duration-300", scrolled ? "bg-white/90 shadow-[0_1px_0_var(--brand-line)] backdrop-blur-lg" : "night-scope bg-transparent")}>
      <div className="container-site flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${brand.fullName} home`} className="shrink-0">
          <Logo tone={scrolled ? "light" : "dark"} size={52} decorative />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 xl:flex">
          {brand.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                {item.label}
              </Link>
            );
          })}
          <Link href="/compare" aria-current={pathname === "/compare" ? "page" : undefined} className={linkClass(pathname === "/compare")}>
            Compare
            {slugs.length > 0 && <span className={cn("tabular ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium", scrolled ? "bg-primary text-white" : "bg-accent text-night")}>{slugs.length}</span>}
          </Link>
          <Link href="/book" className={cn("btn min-h-11 px-5", scrolled ? "btn-primary" : "border-accent text-white hover:bg-accent hover:text-night")}>
            {brand.copy.bookCta}
          </Link>
        </nav>

        <button type="button" aria-label="Open menu" aria-haspopup="dialog" onClick={() => setMenuOpen(true)} className={cn("flex h-11 w-11 items-center justify-center rounded-full xl:hidden", scrolled ? "text-ink" : "text-white")}>
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
