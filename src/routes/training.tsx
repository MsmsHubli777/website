import { createFileRoute } from "@tanstack/react-router";
import {
  Radio,
  ShieldAlert,
  IdCard,
  Truck,
  Video,
  Siren,
  FileText,
  MessageSquare,
  Lock,
  ClipboardList,
} from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import trainingImage from "@/assets/training.jpg";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training & Recruitment | Manna Security & Manpower Services" },
      {
        name: "description",
        content:
          "Recruitment based on physical and educational standards with background and police verification, followed by training in security procedures, CCTV monitoring and emergency response.",
      },
      { property: "og:title", content: "Training & Recruitment | Manna Security" },
      {
        property: "og:description",
        content:
          "How Manna Security recruits, verifies and trains security and manpower personnel before deployment.",
      },
    ],
  }),
  component: Training,
});

const topics = [
  { icon: ShieldAlert, label: "Physical protection" },
  { icon: IdCard, label: "Access and identification control" },
  { icon: Truck, label: "Vehicle and material control" },
  { icon: Video, label: "CCTV monitoring" },
  { icon: Siren, label: "Emergency situations" },
  { icon: FileText, label: "Records and reports" },
  { icon: MessageSquare, label: "Communication and public relations" },
  { icon: Lock, label: "Crime prevention" },
  { icon: ClipboardList, label: "Security procedures" },
];

const steps = [
  {
    title: "Selection standards",
    text: "Candidates are considered against physical and educational standards for the role.",
  },
  {
    title: "Background verification",
    text: "Background and police verification procedures are carried out before deployment.",
  },
  {
    title: "Structured training",
    text: "Training covers security duties, reporting, conduct and emergency handling.",
  },
  {
    title: "Deployment & review",
    text: "Personnel are deployed under supervision, with continued guidance on site.",
  },
];

function Training() {
  return (
    <>
      <PageHero
        eyebrow="Training & Recruitment"
        title="Personnel prepared before they reach your site"
        subtitle="Recruitment considers physical and educational standards and includes background and police verification, followed by structured training."
      />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img
            src={trainingImage}
            alt="Security supervisor briefing uniformed trainees during a training session"
            width={1400}
            height={900}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />
          <ol className="grid gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-gradient font-display font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-primary">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-x">
          <p className="eyebrow">
            <Radio className="size-4" /> Training Topics
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            What our personnel are trained in
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div
                key={t.label}
                className="card-elevated card-elevated-hover flex items-center gap-4 p-6"
              >
                <t.icon className="size-6 shrink-0 text-accent" />
                <span className="font-semibold text-primary">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
