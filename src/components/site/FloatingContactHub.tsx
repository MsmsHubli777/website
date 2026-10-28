import { Phone, FileText } from "lucide-react";
import { useQuoteModal } from "./QuoteModal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useSiteControl } from "@/context/SiteControlContext";

export function FloatingContactHub() {
  const { openQuoteModal } = useQuoteModal();
  const { contact, toggles } = useSiteControl();

  if (!toggles.showFloatingContactHub) return null;

  return (
    <aside
      aria-label="Quick Connect Controls"
      className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3"
    >
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        className="flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <WhatsAppIcon className="size-4.5 text-white shrink-0" />
        <span className="font-semibold tracking-wide">WhatsApp Chat</span>
      </a>

      <a
        href={contact.phoneHref}
        aria-label="Call Manna Security"
        className="group flex items-center gap-2.5 rounded-full bg-navy-gradient border border-accent/40 px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <Phone className="size-4 text-accent" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all group-hover:max-w-xs group-hover:opacity-100">
          Call {contact.phone}
        </span>
      </a>

      {toggles.enableQuoteModal && (
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="flex items-center gap-2.5 rounded-full bg-accent px-4 py-3 text-xs font-bold text-accent-foreground shadow-[var(--shadow-gold)] transition-all hover:scale-105 active:scale-95"
        >
          <FileText className="size-4" />
          <span>Get Free Quote</span>
        </button>
      )}
    </aside>
  );
}
