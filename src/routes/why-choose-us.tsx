import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, Eye, Layers, SearchCheck, Cctv, FileSpreadsheet } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/CtaBand";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us | Manna Security & Manpower Services" },
      {
        name: "description",
        content:
          "Trained personnel, professional supervision, comprehensive services, verification and recruitment procedures, modern security systems and administrative support.",
      },
      { property: "og:title", content: "Why Choose Manna Security & Manpower Services" },
      {
        property: "og:description",
        content:
          "Six reasons organisations choose Manna Security & Manpower Services for security and manpower requirements.",
      },
    ],
  }),
  component: WhyChooseUs,
});

const benefits = [
  {
    icon: UserCheck,
    title: "Trained Personnel",
    text: "Professionally recruited and trained security and manpower staff.",
  },
  {
    icon: Eye,
    title: "Professional Supervision",
    text: "Structured supervision and operational monitoring.",
  },
  {
    icon: Layers,
    title: "Comprehensive Services",
    text: "Security, housekeeping, gardening and manpower solutions from one organisation.",
  },
  {
    icon: SearchCheck,
    title: "Verification & Recruitment",
    text: "Recruitment and background verification procedures.",
  },
  {
    icon: Cctv,
    title: "Modern Security Systems",
    text: "Use of CCTV, communication and monitoring infrastructure.",
  },
  {
    icon: FileSpreadsheet,
    title: "Administrative Support",
    text: "Support for personnel administration, wages, ESI, PF, uniforms and related responsibilities.",
  },
];

function WhyChooseUs() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="A dependable partner for security and manpower"
        subtitle="Discipline, verification and supervision are built into the way we recruit, train and deploy personnel."
      />

      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <article key={b.title} className="card-elevated card-elevated-hover group p-8">
              <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <b.icon className="size-6" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-primary">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
