import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/CtaBand";
import { useSiteControl } from "@/context/SiteControlContext";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Manna Security & Manpower Services, Hubli" },
      {
        name: "description",
        content:
          "Apply to Manna Security & Manpower Services for security guard, supervisor, housekeeping and skilled, semi-skilled or unskilled manpower opportunities in Karnataka.",
      },
      { property: "og:title", content: "Careers at Manna Security & Manpower Services" },
      {
        property: "og:description",
        content:
          "Share your details with Manna Security & Manpower Services for security and manpower roles.",
      },
    ],
  }),
  component: Careers,
});

const roles = [
  "Security Guard",
  "Security Supervisor",
  "Housekeeping Staff",
  "Skilled Worker",
  "Semi-skilled Worker",
  "Unskilled Worker",
];

function Careers() {
  const [submitting, setSubmitting] = useState(false);
  const { contact, addQuoteSubmission } = useSiteControl();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const location = (formData.get("location") as string) || "";
    const position = (formData.get("position") as string) || "General Role";
    const experience = (formData.get("experience") as string) || "";
    const message = (formData.get("message") as string) || "";
    const resumeFile = formData.get("resume") as File | null;
    const resumeName = resumeFile && resumeFile.name ? resumeFile.name : "";

    const combinedMsg = [
      location ? `Location: ${location}` : "",
      experience ? `Exp: ${experience}` : "",
      resumeName ? `Resume: ${resumeName}` : "",
      message ? `Note: ${message}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    addQuoteSubmission({
      name,
      phone,
      email,
      organization: location ? `Location: ${location}` : undefined,
      service: `Job App: ${position}`,
      message: combinedMsg || "Job Application Submitted",
      type: "career",
    });

    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Application Submitted Successfully!", {
        description: `Thank you, ${name}. Your application for ${position} has been logged. Call ${contact.phone} for status updates.`,
      });
    }, 500);
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career in security and manpower services"
        subtitle="We welcome candidates interested in security and manpower opportunities. Share your details and our team will get in touch."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-bold text-primary">Roles we recruit for</h2>
            <ul className="mt-6 grid gap-3">
              {roles.map((r) => (
                <li
                  key={r}
                  className="rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm font-semibold text-primary"
                >
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Applications are reviewed against physical and educational standards and are subject
              to background and police verification procedures.
            </p>
          </div>

          <form onSubmit={onSubmit} className="card-elevated grid gap-5 p-7 sm:p-9">
            <h2 className="text-2xl font-bold text-primary">Application form</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required autoComplete="name" placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="email@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" required placeholder="e.g. Hubballi / Dharwad" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position Applied For *</Label>
                <select
                  id="position"
                  name="position"
                  required
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <option value="">Select a position</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" name="experience" placeholder="e.g. 2 years" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message / Additional Details</Label>
              <Textarea id="message" name="message" rows={4} placeholder="Briefly mention your background or availability..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" />
            </div>
            <Button type="submit" variant="gold" size="xl" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
