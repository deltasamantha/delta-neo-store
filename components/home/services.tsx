import Link from "next/link";

type Service = {
  title: string;
  description: string;
  href: string;
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section aria-label="Client services" className="section rule-subtle">
      <ul className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {services.map((service) => (
          <li key={service.title} className="stack-tight">
            <h2 className="type-label">{service.title}</h2>
            <p className="type-caption text-muted">{service.description}</p>
            <Link href={service.href} className="link type-caption mt-1 self-start font-medium">
              Learn more
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
