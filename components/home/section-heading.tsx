import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({ title, href, linkLabel = "View all" }: Props) {
  return (
    <div className="container-page flex items-end justify-between gap-4 pb-6 md:pb-8">
      <h2 className="type-heading">{title}</h2>
      {href && (
        <Link href={href} className="link type-caption font-medium">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
