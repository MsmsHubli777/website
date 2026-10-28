import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteControl } from "@/context/SiteControlContext";

interface QuoteModalContextType {
  openQuoteModal: (defaultService?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const { company, contact, addQuoteSubmission, services } = useSiteControl();
  const activeServices = services ? services.filter((s) => s.isActive !== false) : [];

  const openQuoteModal = (defaultService?: string) => {
    if (defaultService) {
      setSelectedService(defaultService);
    }
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const organization = (formData.get("organization") as string) || "";
    const service = (formData.get("service") as string) || selectedService || "General Enquiry";
    const message = (formData.get("message") as string) || "";

    // Record submission into SiteControlContext so admin can review it in /admin!
    addQuoteSubmission({
      name,
      phone,
      email,
      organization,
      service,
      message,
      type: "quote",
    });

    const subject = `New Service Enquiry: ${service} - ${name}`;
    const body = `Hello ${company.name},

I would like to submit a new service enquiry.

Enquiry Details:
------------------------------------------
• Full Name: ${name}
• Phone Number: ${phone}
• Email Address: ${email || "N/A"}
• Company / Organization: ${organization || "N/A"}
• Service Required: ${service}
• Requirements / Details: ${message || "N/A"}

Please call me back or respond to this enquiry at your earliest convenience.

Best regards,
${name}`;

    setTimeout(() => {
      setSubmitting(false);
      setIsOpen(false);
      form.reset();
      toast.success("Quote Request Submitted!", {
        description: `Your request has been logged. Our team will contact you shortly. Urgent? Call ${contact.phone}.`,
        action: {
          label: "Call Now",
          onClick: () => {
            window.location.href = contact.phoneHref;
          },
        },
      });
    }, 400);
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-border bg-background shadow-2xl">
          <div className="bg-navy-gradient text-primary-foreground p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-primary-foreground">
                  Request a Free Quote
                </DialogTitle>
                <DialogDescription className="text-xs text-primary-foreground/80 mt-0.5">
                  {company.name} · {contact.shortAddress}
                </DialogDescription>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="q-name">Full Name *</Label>
                <Input id="q-name" name="name" required placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q-phone">Phone Number *</Label>
                <Input
                  id="q-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9+]*"
                  required
                  placeholder="10-digit mobile number"
                  onInput={(e) => {
                    const target = e.currentTarget;
                    target.value = target.value.replace(/[^0-9+]/g, "");
                  }}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="q-email">Email Address</Label>
                <Input id="q-email" name="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q-org">Company / Organization</Label>
                <Input id="q-org" name="organization" placeholder="Facility or Business Name" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="q-service">Service Required *</Label>
              <select
                id="q-service"
                name="service"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                <option value="">Select a service option</option>
                {activeServices.map((s) => (
                  <option key={s.id || s.title} value={s.title}>
                    {s.title} {s.badge ? `(${s.badge})` : ""}
                  </option>
                ))}
                <option value="Custom / Other Requirement">Custom / Other Requirement</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="q-message">Project / Requirements Details</Label>
              <Textarea
                id="q-message"
                name="message"
                rows={3}
                placeholder="Tell us about your site location, shift count, or operational needs..."
              />
            </div>

            <div className="mt-2 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeQuoteModal}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" size="lg" disabled={submitting}>
                {submitting ? "Sending Request..." : "Submit Quote Request"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </QuoteModalContext.Provider>
  );
}
