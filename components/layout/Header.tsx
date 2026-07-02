"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-[var(--color-header-overlay)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[var(--max-width)] items-center justify-between px-6 py-6 md:relative md:justify-start md:px-16 lg:px-28">
        <Link href="/" className="font-serif text-[30px] text-black">
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-4 md:contents">
          <button
            type="button"
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
          </button>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-full flex-col gap-4 bg-white/95 px-6 py-4 md:absolute md:left-1/2 md:right-auto md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:flex-row md:items-center md:gap-10 md:bg-transparent md:p-0`}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-serif text-[18px] font-bold text-black ${
                  isActiveLink(pathname, link.href) ? "border-b-2 border-black pb-1" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/cart"
            aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : "Cart"}
            className="relative md:ml-auto"
          >
            <Image
              src="/images/cart.png"
              alt=""
              width={25}
              height={25}
              className="object-contain"
            />
            {itemCount > 0 && (
              <span
                className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 font-body text-[12px] text-white"
                data-testid="cart-count"
              >
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
