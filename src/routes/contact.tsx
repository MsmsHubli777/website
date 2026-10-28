import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/CtaBand";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useSiteControl } from "@/context/SiteControlContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Manna Security & Manpower Services, Hubli" },
      {
        name: "description",
        content:
          "Contact Manna Security & Manpower Services in Hubli, Karnataka. Call or send an enquiry.",
      },
      { property: "og:title", content: "Contact Manna Security & Manpower Services" },
      {
        property: "og:description",
        content: "Request a quote for security, housekeeping, gardening or manpower services.",
      },
    ],
  }),
  component: Contact,
});

const serviceOptions = [
  "Security Services",
  "Housekeeping Services",
  "Gardening Services",
  "Manpower Services",
];

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { company, contact, addQuoteSubmission } = useSiteControl();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const organisation = (formData.get("organisation") as string) || "";
    const service = (formData.get("service") as string) || "General Contact Enquiry";
    const details = (formData.get("message") as string) || (formData.get("details") as string) || "";

    // Save to SiteControlContext log
    addQuoteSubmission({
      name,
      phone,
      email,
      organization: organisation,
      service,
      message: details,
      type: "contact",
    });

    const subject = `Website Enquiry: ${service} - ${name}`;
    const body = `Hello ${company.name},

I have submitted an enquiry via your website contact form.

Enquiry Details:
------------------------------------------
• Full Name: ${name}
• Phone Number: ${phone}
• Email Address: ${email || "N/A"}
• Company / Organisation: ${organisation || "N/A"}
• Service Required: ${service}
• Details / Requirements: ${details || "N/A"}

Please contact me back at your earliest convenience.

Best regards,
${name}`;

    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Enquiry Form Submitted Successfully!", {
        description: `Your message has been logged for our operational team. Urgent? Call ${contact.phone}.`,
        action: {
          label: "Call Now",
          onClick: () => {
            window.location.href = contact.phoneHref;
          },
        },
      });
    }, 400);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={`Talk to ${company.short} today`}
        subtitle="Tell us about your premises and requirements, and we will propose a suitable deployment plan."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-bold text-primary">{company.name}</h2>
            <ul className="mt-6 grid gap-5 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">{contact.address}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                <a href={contact.phoneHref} className="font-semibold font-mono text-primary hover:underline">
                  {contact.phone}
                </a>
              </li>
              {contact.altPhone && (
                <li className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent opacity-75" />
                  <a href={contact.altPhoneHref} className="font-semibold font-mono text-primary hover:underline">
                    {contact.altPhone} (Alt)
                  </a>
                </li>
              )}
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                <a
                  href={contact.emailHref}
                  className="font-semibold break-all text-primary hover:underline"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">24/7 security operations capability</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="navy" size="lg">
                <a href={contact.phoneHref}>Call Us</a>
              </Button>
              <Button asChild variant="outlineNavy" size="lg" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <WhatsAppIcon className="size-4.5 text-[#25D366]" /> WhatsApp Chat
                </a>
              </Button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card-elevated grid gap-5 p-7 sm:p-9">
            <h2 className="text-2xl font-bold text-primary">Send an enquiry</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" name="name" required autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-phone">Phone Number *</Label>
                <Input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9+]*"
                  required
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  onInput={(e) => {
                    const target = e.currentTarget;
                    target.value = target.value.replace(/[^0-9+]/g, "");
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-org">Company / Organisation</Label>
                <Input id="c-org" name="organisation" autoComplete="organization" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-service">Service Required</Label>
              <select
                id="c-service"
                name="service"
                required
                className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" name="message" rows={5} />
            </div>
            <Button type="submit" variant="gold" size="xl" disabled={submitting}>
              {submitting ? "Sending…" : "Submit"}
            </Button>
          </form>
        </div>
      </section>

      <section className="section bg-secondary pt-0">
        <div className="container-x">
          <div className="card-elevated overflow-hidden border-2 border-accent/20">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="eyebrow">Official Office Location</p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-primary">{contact.shortAddress}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">
                  {contact.address}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild variant="gold" size="lg" className="shadow-md">
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions ➔
                    </a>
                  </Button>
                  <Button asChild variant="outlineNavy" size="lg">
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Full Map
                    </a>
                  </Button>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-[340px] sm:h-[380px] rounded-xl overflow-hidden border border-border shadow-lg group">
                <iframe
                  title={`${company.name} Office Location Map`}
                  src="https://maps.google.com/maps?q=SKD%20Heights%2C%20beside%20Arts%20College%2C%20Vidya%20Nagar%2C%20Hubballi%2C%20Karnataka%20580021&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow flex items-center gap-1.5 hover:bg-background transition-colors"
                >
                  <MapPin className="size-3.5 text-accent" />
                  <span>{contact.shortAddress}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
