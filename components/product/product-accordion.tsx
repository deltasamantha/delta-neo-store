import type { ReactNode } from "react";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function ProductAccordion({ title, defaultOpen, children }: Props) {
  return (
    <details open={defaultOpen} className="group rule-subtle">
      <summary className="flex h-14 cursor-pointer list-none items-center justify-between type-label [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="text-base font-normal transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="stack pb-6 type-caption text-muted">{children}</div>
    </details>
  );
}
