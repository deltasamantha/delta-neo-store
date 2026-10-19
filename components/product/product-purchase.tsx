"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  sizes?: string[];
  soldOut: boolean;
};

export function ProductPurchase({ sizes, soldOut }: Props) {
  const singleSize = sizes?.length === 1 ? sizes[0] : null;
  const [size, setSize] = useState<string | null>(singleSize);
  const [message, setMessage] = useState<string | null>(null);
  const needsSize = Boolean(sizes?.length) && !size;

  function addToBag() {
    if (needsSize) {
      setMessage("Please select a size.");
      return;
    }
    // TODO: connect to the cart once it exists.
    setMessage("The shopping bag isn't available yet.");
  }

  return (
    <div className="stack">
      {sizes && sizes.length > 1 && (
        <fieldset className="stack-tight">
          <div className="flex items-baseline justify-between">
            <legend className="type-label">Size</legend>
            <Link href="/help/size-guide" className="link type-caption">
              Size guide
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-px border border-line-subtle bg-line-subtle">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                disabled={soldOut}
                onClick={() => {
                  setSize(option);
                  setMessage(null);
                }}
                className="h-11 cursor-pointer bg-paper type-caption transition-colors hover:bg-surface-strong disabled:cursor-not-allowed disabled:text-subtle aria-pressed:bg-ink aria-pressed:text-paper"
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="stack-tight">
        <button type="button" className="btn btn-primary btn-block" disabled={soldOut} onClick={addToBag}>
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
        <Link href="/appointments" className="btn btn-outline btn-block">
          {soldOut ? "Ask a client advisor" : "Book an appointment"}
        </Link>
      </div>

      <p role="status" className="type-caption text-muted empty:hidden">
        {message}
      </p>
    </div>
  );
}
