import Link from "next/link";
import { footerLinks } from "@/lib/catalog";

function toHref(label: string) {
  return `/${label.toLowerCase().replace(/\s+/g, "-")}`;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="container-page grid gap-12 py-section md:grid-cols-[2fr_repeat(3,1fr)]">
        <div className="stack max-w-sm">
          <p className="text-2xl font-medium tracking-[0.3em] uppercase">Neo</p>
          <p className="type-caption text-subtle">
            Modern luxury, considered craftsmanship and pieces made to last.
          </p>
        </div>
        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title} className="stack">
            <h2 className="type-label">{group.title}</h2>
            <ul className="stack-tight">
              {group.links.map((label) => (
                <li key={label}>
                  <Link href={toHref(label)} className="link-nav font-normal text-subtle hover:text-paper">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-paper/20 py-6 type-caption text-subtle sm:flex-row sm:justify-between">
          <p>© 2026 Neo. All rights reserved.</p>
          <p>United States · English</p>
        </div>
      </div>
    </footer>
  );
}
