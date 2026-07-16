"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/cart/CartIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Catálogo" },
  { href: "/a-medida", label: "A medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

interface NavbarProps {
  nombreMarca: string;
  logoUrl: string;
}

export function Navbar({ nombreMarca, logoUrl }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image
            src={logoUrl}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
            priority
          />
          <span className="font-heading text-lg font-semibold whitespace-nowrap">
            {nombreMarca}
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring",
                  pathname === link.href
                    ? "text-madera font-semibold"
                    : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <CartIcon />

          {/* Menú mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring md:hidden"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-heading">{nombreMarca}</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-base font-medium hover:bg-accent",
                        pathname === link.href && "text-madera font-semibold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
