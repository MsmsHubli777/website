import { Phone, FileText } from "lucide-react";
import { useQuoteModal } from "./QuoteModal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useSiteControl } from "@/context/SiteControlContext";

export function MobileBar() {
  const { openQuoteModal } = useQuoteModal();
  const { contact, toggles } = useSiteControl();

  if (!toggles.showMobileBar) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className={`grid ${toggles.enableQuoteModal ? "grid-cols-3" : "grid-cols-2"} text-xs font-semibold`}>
        <a
          href={contact.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-primary transition-colors active:bg-secondary"
        >
          <Phone className="size-5" />
          Call Now
        </a>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-l border-border py-3 text-[#25D366] transition-colors active:bg-secondary font-bold"
        >
          <WhatsAppIcon className="size-5 text-[#25D366]" />
          WhatsApp
        </a>
        {toggles.enableQuoteModal && (
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="flex flex-col items-center gap-1 bg-accent py-3 text-accent-foreground active:opacity-90"
          >
            <FileText className="size-5" />
            Get Quote
          </button>
        )}
      </div>
    </div>
  );
}
