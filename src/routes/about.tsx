import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import logoImage from "@/assets/logo.png";
import proprietorImage from "@/assets/proprietor.jpg";
import teamImage from "@/assets/team.jpg";
import { Award, CheckCircle2, ShieldCheck, UserCheck, Users, Quote, Building2, ShieldAlert } from "lucide-react";
import { useSiteControl } from "@/context/SiteControlContext";
import { PROPRIETOR, TEAM_INFO } from "@/lib/site";
import { ClientShowcase } from "@/components/site/ClientShowcase";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Leadership | Manna Security & Manpower Services, Hubli" },
      {
        name: "description",
        content:
          "Meet Proprietor J K Hermandemian and our dedicated management team at Manna Security & Manpower Services in Hubli, Karnataka.",
      },
      { property: "og:title", content: "About & Leadership | Manna Security & Manpower Services" },
      {
        property: "og:description",
        content:
          "Professional security, vigilance, patrolling, access management and manpower solutions under the leadership of Proprietor J K Hermandemian.",
      },
    ],
  }),
  component: About,
});

const focus = [
  "Professional security",
  "Trained personnel",
  "Vigilance",
  "Patrolling",
  "Gate control",
  "Access management",
  "Searches",
  "Investigations",
  "Crime prevention",
  "Professional supervision",
];

const steps = [
  { title: "Recruitment", text: "Candidates assessed against physical and educational standards." },
  { title: "Verification", text: "Background and police verification procedures." },
  { title: "Training", text: "Security procedures, emergency response and conduct training." },
  { title: "Deployment", text: "Personnel deployed to the client site with clear duties." },
  { title: "Supervision", text: "Structured supervision and operational monitoring." },
  { title: "Continuous Support", text: "Ongoing administrative and operational support." },
];

function About() {
  const { company, contact } = useSiteControl();

  return (
    <>
      <PageHero
        eyebrow="About & Leadership"
        title="A professional security and manpower organisation"
        subtitle={`${company.name} serves industrial, commercial, and residential clients with trained security personnel, housekeeping, gardening, and manpower solutions.`}
      />

      {/* Who We Are */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-secondary px-3.5 py-1 text-xs font-bold text-accent tracking-wider uppercase mb-4">
              <Award className="size-4 text-accent" />
              <span>{company.motto}</span>
            </div>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Who We Are</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {company.name}, based at {contact.address}, provides trusted security and manpower solutions
              for industries, commercial establishments, institutions, offices, hotels, and residential communities.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our work is built around disciplined personnel, defined security procedures, and professional supervision,
              supported by robust administrative systems handling personnel records, background checks, wages, statutory compliance, and uniforms.
            </p>
          </div>

          <div className="card-elevated p-8 flex flex-col items-center text-center bg-navy-gradient text-primary-foreground border-2 border-accent/40 shadow-2xl">
            <img
              src={logoImage}
              alt={`${company.name} Emblem`}
              width={160}
              height={160}
              className="size-36 rounded-full border-4 border-accent bg-background/20 object-contain p-1 shadow-lg"
            />
            <h3 className="mt-5 font-display text-xl font-bold text-primary-foreground">{company.name}</h3>
            <p className="mt-1 text-xs font-bold tracking-widest text-accent uppercase">★ {company.motto} ★</p>
            <p className="mt-3 text-xs text-primary-foreground/75">{contact.address}</p>
          </div>
        </div>
      </section>

      {/* Proprietor Section */}
      <section className="section bg-secondary relative overflow-hidden">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Leadership Spotlight</p>
            <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Meet Our Proprietor</h2>
            <p className="mt-2 text-muted-foreground">
              Guiding {company.name} with integrity, discipline, and commitment to service excellence.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
            {/* Proprietor Photo Card */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent via-amber-500 to-accent opacity-30 blur-xl group-hover:opacity-60 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent/60 bg-navy-deep p-2 shadow-2xl">
                <img
                  src={proprietorImage}
                  alt="J K Hermandemian - Proprietor, Manna Security & Manpower Services"
                  className="w-full h-auto object-cover rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-4 bg-navy-gradient text-primary-foreground text-center rounded-b-xl mt-2 border-t border-accent/30">
                  <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/50 rounded-md text-accent text-xs font-bold tracking-widest uppercase mb-1">
                    {PROPRIETOR.designation}
                  </div>
                  <h3 className="text-xl font-bold text-white">{PROPRIETOR.name}</h3>
                  <p className="text-xs text-primary-foreground/80 font-medium">Proprietor & Operational Head</p>
                </div>
              </div>
            </div>

            {/* Proprietor Details & Bio */}
            <div className="space-y-6">
              <div className="card-elevated p-6 sm:p-8 border-l-4 border-l-accent">
                <div className="flex items-center gap-3 text-accent mb-3">
                  <Quote className="size-6 shrink-0" />
                  <p className="font-semibold italic text-primary text-base sm:text-lg">
                    "{PROPRIETOR.quote}"
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-primary mt-4">{PROPRIETOR.name}</h3>
                <p className="text-xs font-bold text-accent tracking-widest uppercase mt-0.5">
                  Proprietor — {company.name}
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {PROPRIETOR.bio}
                </p>
              </div>

              <div className="card-elevated p-6 bg-background">
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent" /> Leadership Core Commitments
                </h4>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {PROPRIETOR.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-primary">
                      <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">Our Operational Leadership</p>
            <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{TEAM_INFO.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {TEAM_INFO.description}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Team Photo */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-navy-deep via-accent/40 to-navy-deep opacity-20 blur-xl group-hover:opacity-40 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent/50 bg-background p-2 shadow-2xl">
                <img
                  src={teamImage}
                  alt="Management and Operations Team with Proprietor J K Hermandemian"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-4 bg-navy-gradient text-primary-foreground text-center rounded-b-xl mt-2 border-t border-accent/30">
                  <p className="text-sm font-bold text-white flex items-center justify-center gap-2">
                    <Users className="size-4 text-accent" />
                    Proprietor J K Hermandemian & Core Management Team
                  </p>
                  <p className="text-xs text-primary-foreground/75 mt-0.5">
                    Hubli Office Operations, Site Supervision & Security Administration
                  </p>
                </div>
              </div>
            </div>

            {/* Team Structure Cards */}
            <div className="space-y-4 order-1 lg:order-2">
              <div className="card-elevated p-5 flex items-start gap-4 hover:border-accent/50 transition-colors">
                <span className="p-3 rounded-lg bg-navy-gradient text-accent shrink-0">
                  <ShieldCheck className="size-6" />
                </span>
                <div>
                  <h4 className="font-bold text-primary text-base">Proprietor Leadership</h4>
                  <p className="text-xs font-semibold text-accent mt-0.5">J K Hermandemian</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Direct oversight over client relationships, guard deployment ethics, quality assurance, and organization vision.
                  </p>
                </div>
              </div>

              <div className="card-elevated p-5 flex items-start gap-4 hover:border-accent/50 transition-colors">
                <span className="p-3 rounded-lg bg-navy-gradient text-accent shrink-0">
                  <ShieldAlert className="size-6" />
                </span>
                <div>
                  <h4 className="font-bold text-primary text-base">Field Operations & Patrols</h4>
                  <p className="text-xs font-semibold text-accent mt-0.5">Senior Security Officers</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Conducting routine day/night surprise checks, post audits, emergency readiness drills, and beat patrols across all sites.
                  </p>
                </div>
              </div>

              <div className="card-elevated p-5 flex items-start gap-4 hover:border-accent/50 transition-colors">
                <span className="p-3 rounded-lg bg-navy-gradient text-accent shrink-0">
                  <UserCheck className="size-6" />
                </span>
                <div>
                  <h4 className="font-bold text-primary text-base">Verification & Compliance</h4>
                  <p className="text-xs font-semibold text-accent mt-0.5">Admin & HR Team</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Handling police verification, background checks, wage distributions, statutory compliance, uniforms, and documentation.
                  </p>
                </div>
              </div>

              <div className="card-elevated p-5 flex items-start gap-4 hover:border-accent/50 transition-colors">
                <span className="p-3 rounded-lg bg-navy-gradient text-accent shrink-0">
                  <Building2 className="size-6" />
                </span>
                <div>
                  <h4 className="font-bold text-primary text-base">Client Coordination</h4>
                  <p className="text-xs font-semibold text-accent mt-0.5">Dedicated Site Supervisors</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Serving as 24/7 direct touchpoints for client feedback, daily attendance logging, visitor logs, and gate control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Competencies */}
      <section className="section bg-secondary">
        <div className="container-x">
          <p className="eyebrow">Key Operational Focus</p>
          <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Core Security & Manpower Competencies</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {focus.map((f) => (
              <li
                key={f}
                className="rounded-lg border border-border bg-background p-4 text-sm font-semibold text-primary shadow-sm hover:border-accent/50 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-x">
          <p className="eyebrow">Our Process</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            From recruitment to continuous support
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="card-elevated card-elevated-hover relative p-7">
                <span className="font-display text-4xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our Clients */}
      <ClientShowcase />

      <CtaBand />
    </>
  );
}
