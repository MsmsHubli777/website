import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { LOCATIONS, NAV } from "@/lib/site";
import { useSiteControl } from "@/context/SiteControlContext";
import logoImage from "@/assets/logo.png";

const quickLinks = NAV.filter((n) => n.label !== "Why Choose Us");

export function Footer() {
  const { company, contact } = useSiteControl();

  return (
    <footer className="bg-navy-gradient text-white border-t border-accent/20">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt={`${company.name} Official Seal`}
              width={56}
              height={56}
              className="size-14 rounded-full border-2 border-accent/60 bg-navy-deep object-contain p-0.5 shadow-lg"
            />
            <div>
              <span className="font-display text-lg font-bold block leading-tight text-white">{company.short}</span>
              <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase block">
                & Manpower Services
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold tracking-widest text-accent uppercase">
            ★ {company.motto} ★
          </p>
          <p className="mt-2 text-xs text-white/85 leading-relaxed">{contact.address}</p>
          <p className="mt-2 text-xs font-medium text-white/90">{company.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-[0.16em] text-accent uppercase">Quick Links</h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/85">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-accent flex items-center gap-1.5">
                  <span className="text-accent/60">›</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-[0.16em] text-accent uppercase">Contact Details</h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/85">
            <li className="flex gap-3 items-start">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={contact.phoneHref} className="hover:text-accent font-semibold text-white font-mono">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={contact.emailHref} className="break-all hover:text-accent text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors leading-snug text-white/90">
                {contact.address}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-[0.16em] text-accent uppercase">Operational Presence</h3>
          <ul className="mt-4 grid gap-2 text-sm text-white/85">
            {LOCATIONS.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 bg-navy-deep">
        <div className="container-x flex flex-col items-center justify-center gap-2 py-6 text-center text-xs text-white/85">
          <p>© 2026 {company.name}. All Rights Reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-3 font-medium">
            <p className="flex items-center gap-1.5">
              <span>Powered by</span>
              <a
                href={company.developerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent hover:text-accent/90 underline decoration-accent/50 underline-offset-4 transition-colors"
              >
                {company.developerName}
              </a>
            </p>
            <span className="text-white/30">|</span>
            <Link
              to="/admin"
              className="font-semibold text-white/70 hover:text-accent transition-colors inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10"
            >
              <ShieldCheck className="size-3.5 text-accent" /> Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
