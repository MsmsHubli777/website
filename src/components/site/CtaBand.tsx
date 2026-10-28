import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "./QuoteModal";
import { useSiteControl } from "@/context/SiteControlContext";

export function CtaBand() {
  const { openQuoteModal } = useQuoteModal();
  const { company, contact, toggles } = useSiteControl();

  return (
    <section className="bg-navy-gradient text-primary-foreground">
      <div className="container-x flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Need Reliable Security or Manpower?</h2>
          <p className="mt-2 text-primary-foreground/75">Talk to {company.name} today.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {toggles.enableQuoteModal && (
            <Button variant="gold" size="xl" onClick={() => openQuoteModal()}>
              Get a Quote
            </Button>
          )}
          <Button asChild variant="outlineLight" size="xl">
            <a href={contact.phoneHref}>Call Us</a>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-navy-gradient text-primary-foreground">
      <div className="container-x py-16 sm:py-20">
        <p className="eyebrow animate-fade-in">{eyebrow}</p>
        <h1 className="animate-fade-up mt-3 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="animate-fade-up mt-4 max-w-2xl text-base text-primary-foreground/75 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
