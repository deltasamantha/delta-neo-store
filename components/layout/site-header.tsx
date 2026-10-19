import Link from "next/link";
import { AccountIcon, BagIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { SiteMenu } from "./site-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
        <div>
          <Link href="/help" className="link-nav hidden items-center gap-2 font-bold md:inline-flex">
            <PlusIcon />
            Contact us
          </Link>
          <Link href="/search" className="btn-icon md:hidden" aria-label="Search">
            <SearchIcon />
          </Link>
        </div>

        <Link href="/" className="text-xl font-medium tracking-[0.3em] uppercase md:text-2xl" aria-label="Neo home">
          Neo
        </Link>

        <nav aria-label="Account" className="flex items-center justify-end gap-1">
          <Link href="/cart" className="btn-icon" aria-label="Shopping bag">
            <BagIcon />
          </Link>
          <Link href="/account" className="btn-icon hidden sm:inline-flex" aria-label="Account">
            <AccountIcon />
          </Link>
          <Link href="/search" className="btn-icon hidden md:inline-flex" aria-label="Search">
            <SearchIcon />
          </Link>
          <SiteMenu />
        </nav>
      </div>
    </header>
  );
}
