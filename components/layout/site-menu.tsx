"use client";

import Link from "next/link";
import { useRef } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";

export function SiteMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="btn-icon w-auto gap-2 px-2"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
        <span className="hidden type-label sm:inline">Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 ms-auto h-dvh max-h-none w-full max-w-md bg-paper p-0 text-ink backdrop:bg-ink/40"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-header items-center justify-end px-gutter">
            <button type="button" className="btn-icon" aria-label="Close menu" onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Main" className="flex-1 overflow-y-auto px-gutter pb-10">
            <ul className="stack">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xl font-medium hover:underline" onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rule-subtle stack-tight px-gutter py-6">
            <Link href="/account" className="link-nav" onClick={close}>Sign in</Link>
            <Link href="/help" className="link-nav" onClick={close}>Contact us</Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
