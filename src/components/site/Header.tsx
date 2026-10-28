import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "./QuoteModal";
import { ThemeToggle } from "./ThemeToggle";
import { useSiteControl } from "@/context/SiteControlContext";
import logoImage from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const { company, contact, banner, toggles } = useSiteControl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Banner (If Enabled) */}
      {banner.showTopBanner && (
        <div className="bg-accent text-accent-foreground text-xs py-1.5 px-4 font-semibold text-center border-b border-black/10 flex items-center justify-center gap-2">
          <span className="font-bold uppercase tracking-widest bg-navy-deep text-white px-2 py-0.5 rounded text-[10px]">
            {banner.bannerBadge}
          </span>
          <span className="truncate">{banner.bannerText}</span>
        </div>
      )}

      {/* Top Contact Bar */}
      <div className="hidden bg-navy-deep text-white border-b border-accent/20 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="font-medium flex items-center gap-2">
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline flex items-center gap-1">
              📍 {contact.shortAddress}
            </a>
            <span className="text-white/40">|</span>
            <span className="italic text-white/90">"{company.primarySlogan}"</span>
          </p>
          <div className="flex items-center gap-5">
            <span className="font-bold text-accent tracking-widest uppercase bg-accent/15 px-2.5 py-0.5 rounded border border-accent/30 text-[10px]">
              ★ {company.motto} ★
            </span>
            <a className="hover:text-accent transition-colors font-semibold text-white/90 font-mono" href={contact.phoneHref}>
              📞 {contact.phone}
            </a>
            <a className="hover:text-accent transition-colors text-white/90" href={contact.emailHref}>
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/95 backdrop-blur transition-shadow",
          scrolled && "shadow-[var(--shadow-card)]",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <img
              src={logoImage}
              alt={`${company.name} Logo`}
              width={52}
              height={52}
              className="size-11 sm:size-13 rounded-full object-contain shadow-md border-2 border-accent/40 transition-transform group-hover:scale-105 bg-navy-deep p-0.5"
            />
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-foreground sm:text-lg tracking-tight">
                {company.short}
              </span>
              <span className="block text-[10px] font-bold tracking-[0.18em] text-accent uppercase">
                & Manpower Services
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-accent"
                activeProps={{ className: "text-accent bg-secondary font-bold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {toggles.enableQuoteModal && (
              <Button
                variant="gold"
                size="lg"
                className="hidden sm:inline-flex shadow-md hover:shadow-lg"
                onClick={() => openQuoteModal()}
              >
                Get a Quote
              </Button>
            )}
            <a
              href={contact.phoneHref}
              aria-label="Call us"
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-primary sm:hidden"
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-primary xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav aria-label="Mobile" className="border-t border-border bg-background xl:hidden">
            <div className="container-x grid gap-1 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "text-primary bg-secondary font-semibold" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              {toggles.enableQuoteModal && (
                <Button
                  variant="gold"
                  size="lg"
                  className="mt-2 w-full"
                  onClick={() => {
                    setOpen(false);
                    openQuoteModal();
                  }}
                >
                  Get a Quote
                </Button>
              )}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
