import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import servicesImage from "@/assets/services.jpg";
import { useQuoteModal } from "@/components/site/QuoteModal";
import { useSiteControl } from "@/context/SiteControlContext";
import { getServiceIcon } from "@/lib/serviceIcons";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Security, Housekeeping, Gardening & Manpower – Hubli" },
      {
        name: "description",
        content:
          "Security guards and supervisors, corporate and hotel housekeeping, gardening maintenance and skilled, semi-skilled and unskilled manpower services in Karnataka.",
      },
      { property: "og:title", content: "Our Services | Manna Security & Manpower Services" },
      {
        property: "og:description",
        content:
          "Security, housekeeping, gardening and manpower services delivered by trained and supervised personnel.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const { openQuoteModal } = useQuoteModal();
  const { services } = useSiteControl();

  const activeServices = services.filter((s) => s.isActive !== false);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Security, housekeeping, gardening and manpower"
        subtitle="One organisation for the personnel your site needs, deployed with training, verification and professional supervision."
      />

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {activeServices.map((s) => {
            const IconComp = getServiceIcon(s.iconName);
            return (
              <article key={s.id || s.title} className="card-elevated card-elevated-hover flex flex-col p-8 justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-navy-gradient text-primary-foreground shadow-sm">
                      <IconComp className="size-6 text-accent" />
                    </span>
                    {s.badge && (
                      <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent border border-accent/40">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-primary">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  {s.items && s.items.length > 0 && (
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-foreground/80">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  variant="gold"
                  size="lg"
                  className="mt-8 self-start shadow-md hover:shadow-lg"
                  onClick={() => openQuoteModal(s.title)}
                >
                  Enquire Now
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img
            src={servicesImage}
            alt="Uniformed housekeeping staff maintaining a corporate lobby"
            width={1400}
            height={900}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />
          <div>
            <p className="eyebrow">Deployment</p>
            <h2 className="mt-3 text-3xl font-bold text-primary">
              Personnel matched to your premises
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Requirements differ across industrial units, hotels, institutions, offices and
              residential communities. We assess the site, define duties and deploy personnel with
              supervision and reporting suited to those requirements.
            </p>
            <Button variant="navy" size="xl" className="mt-8" onClick={() => openQuoteModal()}>
              Send Enquiry
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
