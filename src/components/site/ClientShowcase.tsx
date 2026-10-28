import React from "react";
import { Building2, MapPin, ShieldCheck, Hospital, Zap, Landmark, Award, Building, Scale, Laptop, ExternalLink } from "lucide-react";
import { useSiteControl, ClientItem } from "@/context/SiteControlContext";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/components/site/QuoteModal";

const getClientIcon = (category?: string, name?: string) => {
  const text = `${category || ""} ${name || ""}`.toLowerCase();
  if (text.includes("medical") || text.includes("hospital") || text.includes("kmcri")) {
    return Hospital;
  }
  if (text.includes("power") || text.includes("utility") || text.includes("hescom") || text.includes("electric")) {
    return Zap;
  }
  if (text.includes("court") || text.includes("judicial") || text.includes("jmfc")) {
    return Scale;
  }
  if (text.includes("real estate") || text.includes("midmac") || text.includes("builder") || text.includes("developer")) {
    return Building;
  }
  if (text.includes("it") || text.includes("gwp") || text.includes("corporate") || text.includes("software") || text.includes("solutions")) {
    return Laptop;
  }
  if (text.includes("handloom") || text.includes("textile") || text.includes("khdc") || text.includes("corporation")) {
    return Landmark;
  }
  return Building2;
};

export const ClientShowcase: React.FC<{ className?: string; limit?: number }> = ({ className = "", limit }) => {
  const { clients, toggles } = useSiteControl();
  const { openQuoteModal } = useQuoteModal();

  const activeClients = clients.filter((c) => c.isActive !== false);
  const displayClients = limit ? activeClients.slice(0, limit) : activeClients;

  if (displayClients.length === 0) return null;

  return (
    <section className={`section bg-secondary/50 relative overflow-hidden ${className}`}>
      <div className="container-x relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent tracking-wider uppercase mb-3">
              <Award className="size-4 text-accent" />
              <span>Our Valued Clients</span>
            </div>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl tracking-tight">
              Trusted by Renowned Institutions & Organizations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We take immense pride in securing and supporting major healthcare institutes, public utilities, judicial courts, real estate developers, and corporate enterprises across Hubli and Karnataka.
            </p>
          </div>
          {toggles.enableQuoteModal && (
            <Button
              variant="navy"
              size="lg"
              onClick={() => openQuoteModal()}
              className="shrink-0 shadow-md hover:scale-105 transition-all text-xs sm:text-sm font-bold"
            >
              Partner With Us
            </Button>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayClients.map((client: ClientItem, idx: number) => {
            const ClientIcon = getClientIcon(client.category, client.name);
            return (
              <article
                key={client.id || idx}
                className="card-elevated card-elevated-hover relative flex flex-col justify-between p-6 sm:p-7 border border-border/80 group overflow-hidden bg-background"
              >
                {/* Top accent glow line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy-gradient text-accent shadow-md transition-transform group-hover:scale-110">
                      <ClientIcon className="size-6" />
                    </span>
                    {client.badge && (
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold text-accent border border-accent/30 shadow-xs">
                        {client.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-primary tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {client.name}
                  </h3>

                  {client.location && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MapPin className="size-3.5 text-accent shrink-0" />
                      <span>{client.location}</span>
                    </div>
                  )}

                  {client.category && (
                    <p className="mt-1 text-xs font-semibold text-accent/90 uppercase tracking-wider">
                      {client.category}
                    </p>
                  )}

                  {client.description && (
                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {client.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                  <div className="flex items-center gap-1.5 text-accent">
                    <ShieldCheck className="size-4" />
                    <span>Verified Client</span>
                  </div>
                  {client.websiteUrl ? (
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-bold"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-muted-foreground font-mono">Hubli-Dharwad Sector</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
