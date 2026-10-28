import { createFileRoute } from "@tanstack/react-router";
import {
  Server,
  Database,
  Zap,
  Cctv,
  Wind,
  Wrench,
  Cable,
  FireExtinguisher,
  Wifi,
  MapPin,
} from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import { LOCATIONS } from "@/lib/site";
import infraImage from "@/assets/infrastructure.jpg";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure & Operations | Manna Security & Manpower Services" },
      {
        name: "description",
        content:
          "Computer and network infrastructure, data systems, generators, CCTV and security systems, air conditioning, plumbing, data cabling, fire extinguishers and Wi-Fi facilities.",
      },
      { property: "og:title", content: "Infrastructure | Manna Security & Manpower Services" },
      {
        property: "og:description",
        content:
          "Operational infrastructure and presence across Hubli-Dharwad, Bengaluru, Kalaburagi, Belagavi and Mysuru.",
      },
    ],
  }),
  component: Infrastructure,
});

const items = [
  { icon: Server, label: "Computer / network infrastructure" },
  { icon: Database, label: "Data systems" },
  { icon: Zap, label: "Generators" },
  { icon: Cctv, label: "CCTV and security systems" },
  { icon: Wind, label: "Air conditioning" },
  { icon: Wrench, label: "Plumbing" },
  { icon: Cable, label: "Low-voltage / data cabling" },
  { icon: FireExtinguisher, label: "Fire extinguishers" },
  { icon: Wifi, label: "Wi-Fi facilities" },
];

function Infrastructure() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="Systems that keep operations running"
        subtitle="Our operational setup supports coordination, monitoring and administration across the sites we serve."
      />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src={infraImage}
            alt="CCTV control room with an operator monitoring multiple camera feeds"
            width={1400}
            height={900}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((i) => (
              <div key={i.label} className="card-elevated card-elevated-hover p-5">
                <i.icon className="size-5 text-accent" />
                <p className="mt-3 text-sm font-semibold text-primary">{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-x">
          <p className="eyebrow">Operational Presence</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">Where we operate</h2>
          <div className="mt-10 flex flex-wrap gap-4">
            {LOCATIONS.map((l) => (
              <span
                key={l}
                className="card-elevated flex items-center gap-2 px-5 py-3 text-sm font-semibold text-primary"
              >
                <MapPin className="size-4 text-accent" /> {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
