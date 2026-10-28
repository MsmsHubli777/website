import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Clock,
  UserCheck,
  Eye,
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  Factory,
  Home as HomeIcon,
  Briefcase,
  Hotel,
  GraduationCap,
  Award,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { LOCATIONS, PROPRIETOR } from "@/lib/site";
import heroImage from "@/assets/hero-security.jpg";
import logoImage from "@/assets/logo.png";
import proprietorImage from "@/assets/proprietor.jpg";
import teamImage from "@/assets/team.jpg";
import { useQuoteModal } from "@/components/site/QuoteModal";
import { useSiteControl } from "@/context/SiteControlContext";
import { getServiceIcon } from "@/lib/serviceIcons";
import { Users, Quote } from "lucide-react";
import { ClientShowcase } from "@/components/site/ClientShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manna Security & Manpower Services | Hubli, Karnataka" },
      {
        name: "description",
        content:
          "Professional security guards, housekeeping, gardening and skilled manpower services in Hubli, Karnataka. Trained personnel, professional supervision and 24/7 security operations.",
      },
      { property: "og:title", content: "Manna Security & Manpower Services | Hubli, Karnataka" },
      {
        property: "og:description",
        content:
          "Reliable security, housekeeping, gardening and manpower services for businesses, institutions, industries and residential clients.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: UserCheck, title: "Trained Personnel", text: "Professionally recruited and trained security and manpower staff." },
  { icon: Eye, title: "Professional Supervision", text: "Structured supervision and operational monitoring." },
  { icon: Clock, title: "24/7 Security Operations", text: "Round-the-clock protection capability and emergency handling." },
  { icon: Layers, title: "Multiple Service Solutions", text: "Integrated security, housekeeping, gardening and manpower." },
];

const sectors = [
  { icon: Factory, title: "Industrial Companies", desc: "Factories, warehouses & industrial parks" },
  { icon: HomeIcon, title: "Residential Communities", desc: "Gated societies, apartments & townships" },
  { icon: Building2, title: "Commercial Establishments", desc: "Retail hubs, complexes & malls" },
  { icon: GraduationCap, title: "Institutions & Schools", desc: "Colleges, schools & educational campuses" },
  { icon: Briefcase, title: "Offices & Corporate", desc: "Corporate buildings & IT parks" },
  { icon: Hotel, title: "Hotels & Hospitality", desc: "Hotels, resorts & venue facilities" },
];

function Home() {
  const { openQuoteModal } = useQuoteModal();
  const { company, contact, toggles, services } = useSiteControl();

  const activeServices = services.filter((s) => s.isActive !== false);
  const featuredServices = activeServices.filter((s) => s.isFeatured !== false);
  const displayServices = featuredServices.length > 0 ? featuredServices : activeServices;

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground min-h-[85vh] flex items-center">
        {/* Crisp Background Image */}
        <img
          src={heroImage}
          alt="Uniformed Manna Security personnel on duty"
          width={1600}
          height={1008}
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
          className="absolute inset-0 size-full object-cover object-center opacity-55 scale-105 transition-transform duration-1000"
        />

        {/* Dynamic Dark Gradient Overlay for Maximum Text Contrast & Image Visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.28_0.078_262/0.7),transparent_70%),linear-gradient(180deg,oklch(0.19_0.06_262/0.88)_0%,oklch(0.19_0.06_262/0.65)_50%,oklch(0.19_0.06_262/0.92)_100%)]" />

        <div className="container-x relative py-16 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              {/* Top Mobile/Tablet Logo Badge */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logoImage}
                  alt={`${company.name} Seal`}
                  width={64}
                  height={64}
                  className="size-14 rounded-full border-2 border-accent bg-background/20 object-contain p-0.5 shadow-[var(--shadow-gold)]"
                />
                <div>
                  <span className="block text-xs font-bold tracking-widest text-accent uppercase">
                    ★ {company.motto} ★
                  </span>
                  <span className="block text-xs font-medium text-primary-foreground/90">
                    {company.primarySlogan}
                  </span>
                </div>
              </div>

              <h1 className="animate-fade-up max-w-3xl text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl tracking-tight text-white drop-shadow-md">
                Professional Security & Manpower Solutions You Can Trust
              </h1>
              <p className="animate-fade-up mt-4 text-xs sm:text-sm font-bold tracking-widest text-accent uppercase flex items-center gap-2">
                <span>🛡️</span> {company.secondarySlogan}
              </p>
              <p className="animate-fade-up mt-4 max-w-2xl text-base text-primary-foreground/90 sm:text-lg leading-relaxed drop-shadow">
                Reliable security, housekeeping, gardening and manpower services for businesses,
                institutions, industries and residential clients across Hubli, Dharwad, and Karnataka.
              </p>
              <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-4">
                {toggles.enableQuoteModal && (
                  <Button
                    variant="gold"
                    size="xl"
                    onClick={() => openQuoteModal()}
                    className="shadow-[var(--shadow-gold)] hover:scale-105 transition-all text-sm font-bold"
                  >
                    Get a Free Quote <ArrowRight className="size-4" />
                  </Button>
                )}
                <Button asChild variant="outlineLight" size="xl" className="backdrop-blur bg-background/10">
                  <a href={contact.phoneHref} className="flex items-center gap-2 font-bold font-mono">
                    <PhoneCall className="size-4 text-accent" /> Call {contact.phone}
                  </a>
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-primary-foreground/95">
                {["100% Police Verified Personnel", "Structured Site Supervision", "24/7 Rapid Operations"].map((i) => (
                  <li key={i} className="flex items-center gap-2 bg-background/20 backdrop-blur px-3 py-1.5 rounded-full border border-primary-foreground/15">
                    <CheckCircle2 className="size-4 text-accent shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Logo Seal Glassmorphism Card */}
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-accent/50 bg-background/15 p-8 sm:p-10 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] text-center relative overflow-hidden group hover:border-accent transition-colors">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.78_0.15_76/0.15),transparent_70%)]" />
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-accent/30 blur-xl animate-pulse" />
                <img
                  src={logoImage}
                  alt={`${company.name} Official Seal`}
                  width={220}
                  height={220}
                  className="relative size-44 sm:size-52 rounded-full border-4 border-accent bg-navy-deep object-contain p-1.5 shadow-[var(--shadow-gold)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="mt-6 font-display font-bold text-xl sm:text-2xl text-primary-foreground tracking-tight">
                {company.short}
              </h2>
              <span className="mt-1.5 inline-block rounded-full bg-accent/20 px-4 py-1 text-xs font-bold tracking-widest text-accent uppercase border border-accent/40">
                ★ {company.motto} ★
              </span>
              <p className="mt-3 text-xs text-primary-foreground/80 font-medium">
                {contact.shortAddress}
              </p>
              <div className="mt-5 pt-4 border-t border-primary-foreground/20 w-full flex items-center justify-center gap-2 text-xs font-bold text-accent">
                <Award className="size-4" />
                <span>Certified Security & Manpower Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Services</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              Complete security and facility manpower solutions
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayServices.map((s) => {
              const ServiceIcon = getServiceIcon(s.iconName);
              return (
                <article key={s.id || s.title} className="card-elevated card-elevated-hover group flex flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-navy-gradient text-primary-foreground transition-transform group-hover:scale-105">
                        <ServiceIcon className="size-6 text-accent" />
                      </span>
                      {s.badge && (
                        <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent border border-accent/40">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-primary">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent"
                    >
                      Details <ArrowRight className="size-3.5" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-accent font-semibold hover:bg-accent/10"
                      onClick={() => openQuoteModal(s.title)}
                    >
                      Enquire
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Manna? */}
      <section className="section bg-secondary">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Why Manna?</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              Built on discipline, training and supervision
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {company.name} provides security and manpower solutions to industrial, commercial,
              institutional and residential clients, with structured recruitment, background verification,
              training and continuous supervision.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Operational Presence</p>
              <p className="mt-1 text-sm font-semibold text-primary">{LOCATIONS.join(" · ")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="navy" size="xl">
                <Link to="/why-choose-us">Why Choose Us</Link>
              </Button>
              <Button variant="outlineNavy" size="xl" onClick={() => openQuoteModal()}>
                Get a Free Quote
              </Button>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.title} className="card-elevated p-6 border border-border">
                <h.icon className="size-6 text-accent" />
                <h3 className="mt-4 text-base font-bold text-primary">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="section bg-background">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow">Leadership & Operations</p>
              <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
                Led by Dedicated Leadership & Team
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Under the stewardship of Proprietor J K Hermandemian, our team delivers round-the-clock vigilance, guard discipline, and operational excellence across Karnataka.
              </p>
            </div>
            <Button asChild variant="outlineNavy" size="lg" className="shrink-0">
              <Link to="/about">Learn More About Us <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Card 1: Proprietor */}
            <div className="card-elevated card-elevated-hover p-6 sm:p-8 grid sm:grid-cols-[0.85fr_1.15fr] gap-6 items-center border border-border">
              <div className="rounded-xl overflow-hidden border border-accent/40 bg-navy-deep shadow-md">
                <img
                  src={proprietorImage}
                  alt="J K Hermandemian - Proprietor"
                  className="w-full h-48 sm:h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-xs font-bold uppercase tracking-wider mb-2">
                  Proprietor
                </span>
                <h3 className="text-xl font-bold text-primary">{PROPRIETOR.name}</h3>
                <p className="text-xs font-semibold text-muted-foreground mt-0.5">Founder & Operational Head</p>
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground italic border-l-2 border-accent pl-3 py-1">
                  <Quote className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>"{PROPRIETOR.quote}"</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {PROPRIETOR.bio}
                </p>
              </div>
            </div>

            {/* Card 2: Team */}
            <div className="card-elevated card-elevated-hover p-6 sm:p-8 grid sm:grid-cols-[0.85fr_1.15fr] gap-6 items-center border border-border">
              <div className="rounded-xl overflow-hidden border border-accent/40 bg-navy-deep shadow-md">
                <img
                  src={teamImage}
                  alt="Manna Security Management & Operational Team"
                  className="w-full h-48 sm:h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-navy-gradient text-white border border-accent/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 w-fit">
                  <Users className="size-3.5 text-accent" /> Operations Team
                </span>
                <h3 className="text-xl font-bold text-primary">Management & Supervision</h3>
                <p className="text-xs font-semibold text-muted-foreground mt-0.5">Field Supervisors & Admin Officers</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Working hand-in-hand with our Proprietor, our skilled team ensures continuous night patrolling, site audits, background checks, and prompt client communication.
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-primary">
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-accent shrink-0" /> 24/7 Supervision
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-accent shrink-0" /> Police Verification
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-accent shrink-0" /> Routine Night Patrols
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-accent shrink-0" /> Statutory Compliance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="section">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Organizations We Serve</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              Tailored solutions across diverse sectors
            </h2>
            <p className="mt-3 text-muted-foreground">
              Suitable for companies, communities, commercial establishments and institutions looking for security and manpower services.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div key={sector.title} className="card-elevated card-elevated-hover p-6 flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <sector.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-primary">{sector.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{sector.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <ClientShowcase />

      <CtaBand />
    </>
  );
}
