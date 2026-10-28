import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Clock,
  Trash2,
  Save,
  RotateCcw,
  Sliders,
  Bell,
  Eye,
  EyeOff,
  ExternalLink,
  Smartphone,
  Building,
  Building2,
  Wrench,
  Plus,
  Edit3,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Star,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { useSiteControl, QuoteSubmission, ServiceItem, ClientItem } from "@/context/SiteControlContext";
import { SERVICE_ICON_OPTIONS, getServiceIcon } from "@/lib/serviceIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Manna Security & Manpower Services" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
  errorComponent: ({ error }: { error: Error }) => (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center bg-navy-deep text-white">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/30 mb-4">
        <ShieldCheck className="size-8" />
      </div>
      <h2 className="text-xl font-bold text-white">Admin Control Panel</h2>
      <p className="mt-2 text-xs text-white/80 max-w-md">{error?.message || "An unexpected error occurred loading the dashboard."}</p>
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            sessionStorage.clear();
            window.location.reload();
          }
        }}
        className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-navy-deep shadow-lg hover:brightness-110 transition-all cursor-pointer"
      >
        Reset Session & Open Panel
      </button>
    </div>
  ),
});

function AdminPage() {
  const siteControl = useSiteControl();
  const {
    company,
    contact,
    banner,
    toggles,
    quotes,
    services,
    clients,
    passcode,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateContact,
    updateCompany,
    updateBanner,
    updateToggles,
    updateQuoteStatus,
    deleteQuoteSubmission,
    clearAllQuotes,
    addService,
    updateService,
    deleteService,
    reorderServices,
    resetServicesToDefault,
    addClient,
    updateClient,
    deleteClient,
    reorderClients,
    resetClientsToDefault,
    changePasscode,
    resetToDefaults,
  } = siteControl;

  const [passcodeAttempt, setPasscodeAttempt] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "services" | "clients" | "branding" | "banner" | "toggles" | "quotes" | "security">("contact");

  // Services Management State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    itemsText: "",
    iconName: "ShieldCheck",
    badge: "",
    isFeatured: true,
    isActive: true,
  });

  // Clients Management State
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    name: "",
    shortName: "",
    location: "Hubli",
    category: "",
    description: "",
    badge: "",
    websiteUrl: "",
    isActive: true,
  });

  // Local form states for batch updates
  const [contactForm, setContactForm] = useState({ ...contact });
  const [companyForm, setCompanyForm] = useState({ ...company });
  const [bannerForm, setBannerForm] = useState({ ...banner });
  const [toggleForm, setToggleForm] = useState({ ...toggles });

  useEffect(() => {
    if (contact) setContactForm({ ...contact });
    if (company) setCompanyForm({ ...company });
    if (banner) setBannerForm({ ...banner });
    if (toggles) setToggleForm({ ...toggles });
  }, [contact, company, banner, toggles]);
  const [newPasscodeForm, setNewPasscodeForm] = useState("");
  const [confirmPasscodeForm, setConfirmPasscodeForm] = useState("");
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [showLoginPasscode, setShowLoginPasscode] = useState(false);
  const [quoteFilter, setQuoteFilter] = useState<"all" | "new" | "contacted" | "resolved">("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let attemptVal = passcodeAttempt.trim();
    if (!attemptVal && typeof document !== "undefined") {
      const inputEl = document.getElementById("passcode") as HTMLInputElement | null;
      if (inputEl && inputEl.value) {
        attemptVal = inputEl.value.trim();
      }
    }
    // Fallback to default passcode if submitted blank
    if (!attemptVal) {
      attemptVal = "Harman@123";
    }

    const success = loginAdmin(attemptVal);
    if (success) {
      toast.success("Welcome back, Admin!", { description: "Authenticated successfully." });
      setPasscodeError(false);
      setPasscodeAttempt("");
    } else {
      setPasscodeError(true);
      toast.error("Incorrect Admin Passcode", { description: "Please check your passcode and try again." });
    }
  };

  const saveContactChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    toast.success("Contact Details Saved!", { description: "Mobile number & contact info updated across the entire website." });
  };

  const saveCompanyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(companyForm);
    toast.success("Branding Settings Saved!", { description: "Company slogans and motto updated." });
  };

  const saveBannerChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanner(bannerForm);
    toast.success("Announcement Banner Saved!", { description: "Top header banner settings updated." });
  };

  const saveToggleChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateToggles(toggleForm);
    toast.success("Feature Toggles Saved!", { description: "Website interactive elements updated." });
  };

  const handlePasscodeChange = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNew = newPasscodeForm.trim();
    const cleanConfirm = confirmPasscodeForm.trim();

    if (!cleanNew || cleanNew.length < 4) {
      toast.error("Passcode too short", { description: "Passcode must be at least 4 characters." });
      return;
    }
    if (cleanNew !== cleanConfirm) {
      toast.error("Passcodes do not match", { description: "Please ensure both passcode fields match." });
      return;
    }
    changePasscode(cleanNew);
    toast.success("Admin Passcode Updated!", { description: `New passcode is now set to: "${cleanNew}"` });
    setNewPasscodeForm("");
    setConfirmPasscodeForm("");
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all site settings to default values?")) {
      resetToDefaults();
      toast.info("Site Settings Reset", { description: "All settings restored to factory defaults." });
      setTimeout(() => window.location.reload(), 300);
    }
  };

  const openCreateServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      description: "",
      itemsText: "",
      iconName: "ShieldCheck",
      badge: "",
      isFeatured: true,
      isActive: true,
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      description: service.description,
      itemsText: service.items ? service.items.join("\n") : "",
      iconName: service.iconName || "ShieldCheck",
      badge: service.badge || "",
      isFeatured: service.isFeatured ?? true,
      isActive: service.isActive ?? true,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.description.trim()) {
      toast.error("Title & Description Required");
      return;
    }
    const itemsList = serviceForm.itemsText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload = {
      title: serviceForm.title.trim(),
      description: serviceForm.description.trim(),
      items: itemsList,
      iconName: serviceForm.iconName || "ShieldCheck",
      badge: serviceForm.badge.trim() || undefined,
      isFeatured: serviceForm.isFeatured,
      isActive: serviceForm.isActive,
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
      toast.success("Service Updated");
    } else {
      addService(payload);
      toast.success("New Service Added");
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteService(id);
      toast.info("Service Deleted", { description: `"${title}" has been removed.` });
    }
  };

  const handleMoveService = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;
    const itemA = services[index];
    const itemB = services[targetIndex];
    if (!itemA || !itemB) return;
    const newServices = [...services];
    newServices[index] = itemB;
    newServices[targetIndex] = itemA;
    reorderServices(newServices);
    toast.success("Services Re-ordered");
  };

  const handleResetServices = () => {
    if (window.confirm("Are you sure you want to reset services to original defaults?")) {
      resetServicesToDefault();
      toast.info("Services Reset", { description: "Default services restored." });
    }
  };

  // Client Management Handlers
  const openAddClientModal = () => {
    setEditingClientId(null);
    setClientForm({
      name: "",
      shortName: "",
      location: "Hubli",
      category: "",
      description: "",
      badge: "",
      websiteUrl: "",
      isActive: true,
    });
    setIsClientModalOpen(true);
  };

  const openEditClientModal = (client: ClientItem) => {
    setEditingClientId(client.id);
    setClientForm({
      name: client.name || "",
      shortName: client.shortName || "",
      location: client.location || "",
      category: client.category || "",
      description: client.description || "",
      badge: client.badge || "",
      websiteUrl: client.websiteUrl || "",
      isActive: client.isActive !== false,
    });
    setIsClientModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name.trim()) {
      toast.error("Client Name Required", { description: "Please enter a valid client name." });
      return;
    }

    const payload = {
      name: clientForm.name.trim(),
      shortName: clientForm.shortName.trim() || undefined,
      location: clientForm.location.trim(),
      category: clientForm.category.trim() || undefined,
      description: clientForm.description.trim() || undefined,
      badge: clientForm.badge.trim() || undefined,
      websiteUrl: clientForm.websiteUrl.trim() || undefined,
      isActive: clientForm.isActive,
    };

    if (editingClientId) {
      updateClient(editingClientId, payload);
      toast.success("Client Details Updated", { description: `"${payload.name}" updated successfully.` });
    } else {
      addClient(payload);
      toast.success("New Client Added", { description: `"${payload.name}" added to client panel.` });
    }
    setIsClientModalOpen(false);
  };

  const handleDeleteClient = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from clients?`)) {
      deleteClient(id);
      toast.info("Client Removed", { description: `"${name}" has been deleted.` });
    }
  };

  const handleMoveClient = (index: number, direction: "up" | "down") => {
    const safeClientsList = Array.isArray(clients) ? clients : [];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= safeClientsList.length) return;
    const itemA = safeClientsList[index];
    const itemB = safeClientsList[targetIndex];
    if (!itemA || !itemB) return;
    const newClients = [...safeClientsList];
    newClients[index] = itemB;
    newClients[targetIndex] = itemA;
    reorderClients(newClients);
    toast.success("Clients Re-ordered");
  };

  const handleResetClients = () => {
    if (window.confirm("Are you sure you want to reset clients to original defaults (KMCRI, HESCOM, KHDC, Midmac Developers, GWP Solutions, JMFC Court)?")) {
      resetClientsToDefault();
      toast.info("Clients Reset", { description: "Default clients list restored." });
    }
  };

  // If not authenticated, show passcode login modal
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center bg-navy-deep px-4 py-12">
        <div className="w-full max-w-md card-elevated bg-background p-8 rounded-2xl border-2 border-accent/40 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent border border-accent/30 shadow-inner">
              <ShieldCheck className="size-9" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-foreground tracking-tight">Admin Portal Login</h1>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Enter admin passcode to access control panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-sm font-semibold flex items-center gap-1.5">
                <Lock className="size-4 text-accent" /> Admin Passcode
              </Label>
              <div className="relative">
                <Input
                  id="passcode"
                  type={showLoginPasscode ? "text" : "password"}
                  placeholder="Enter admin passcode"
                  value={passcodeAttempt}
                  onChange={(e) => setPasscodeAttempt(e.target.value)}
                  className={`h-11 pr-10 ${passcodeError ? "border-red-500 ring-1 ring-red-500" : ""}`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPasscode(!showLoginPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  {showLoginPasscode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {passcodeError && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-red-500">
                    Incorrect passcode entered. Please try again.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      changePasscode("Harman@123");
                      setPasscodeError(false);
                      toast.info("Passcode Reset to Default", { description: "Admin passcode has been reset to default." });
                    }}
                    className="text-[11px] font-bold text-accent hover:underline inline-block"
                  >
                    Forgot passcode? Reset to default
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              onClick={handleLogin}
              variant="gold"
              size="xl"
              className="w-full font-bold shadow-lg"
            >
              Unlock Admin Panel ➔
            </Button>
          </form>

          <div className="mt-6 border-t border-border pt-4 text-center">
            <Link to="/" className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const safeQuotes = Array.isArray(quotes) ? quotes : [];
  const safeServices = Array.isArray(services) ? services : [];
  const safeClients = Array.isArray(clients) ? clients : [];

  // Filtered quote submissions
  const filteredQuotes = safeQuotes.filter((q) => {
    if (quoteFilter === "all") return true;
    return q.status === quoteFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-navy-deep text-white border-b border-accent/30 shadow-md">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-navy-deep font-bold">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <span>Website Control Panel</span>
                <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
                  Admin Active
                </span>
              </h1>
              <p className="text-[11px] text-white/70">Manna Security & Manpower Services</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Eye className="size-3.5" />
              <span>Live Website</span>
              <ExternalLink className="size-3" />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={logoutAdmin}
              className="border-red-400/40 text-red-300 hover:bg-red-950/40 hover:text-red-200 text-xs gap-1.5"
            >
              <LogOut className="size-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="container-x py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "contact"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Smartphone className="size-4" />
            <span>Mobile & Contact Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "services"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Wrench className="size-4" />
            <span>Services & Offerings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "clients"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Building2 className="size-4" />
            <span>Client Panel ({safeClients.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("branding")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "branding"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Building className="size-4" />
            <span>Branding & Slogans</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("banner")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "banner"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Bell className="size-4" />
            <span>Top Announcement Banner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("toggles")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "toggles"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Sliders className="size-4" />
            <span>Feature Toggles</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "quotes"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <MessageSquare className="size-4" />
            <span>Quotes & Enquiries</span>
            {safeQuotes.filter((q) => q.status === "new").length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {safeQuotes.filter((q) => q.status === "new").length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "security"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Lock className="size-4" />
            <span>Security & Reset</span>
          </button>
        </div>

        {/* TAB 1: Mobile & Contact Info */}
        {activeTab === "contact" && (
          <div className="grid gap-8 lg:grid-cols-12">
            <form onSubmit={saveContactChanges} className="lg:col-span-7 space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Phone className="size-5 text-accent" /> Control Mobile Numbers & Contact Info
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Updates made here immediately change the Call buttons, Header contact bar, Footer, and Contact page across the website.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-phone" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Primary Mobile Number *
                  </Label>
                  <Input
                    id="primary-phone"
                    value={contactForm?.phone || ""}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="e.g. 7090719777"
                    className="font-mono text-base font-semibold"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground">Displayed on header, floating call button, and footer.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alt-phone" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Secondary / Alt Phone Number
                  </Label>
                  <Input
                    id="alt-phone"
                    value={contactForm?.altPhone || ""}
                    onChange={(e) => setContactForm({ ...contactForm, altPhone: e.target.value })}
                    placeholder="Optional second line e.g. 9900224985"
                    className="font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground">Alternative contact line for emergency dispatch.</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-url" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    WhatsApp Chat URL / Target
                  </Label>
                  <Input
                    id="whatsapp-url"
                    value={contactForm?.whatsapp || ""}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    placeholder="https://wa.me/917090719777"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-addr" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Official Email Address *
                  </Label>
                  <Input
                    id="email-addr"
                    type="email"
                    value={contactForm?.email || ""}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="MsmsHubli777@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-address" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Full Office Address *
                </Label>
                <Textarea
                  id="full-address"
                  rows={3}
                  value={contactForm?.address || ""}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  placeholder="Full office address..."
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="short-address" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Short Address Label
                  </Label>
                  <Input
                    id="short-address"
                    value={contactForm?.shortAddress || ""}
                    onChange={(e) => setContactForm({ ...contactForm, shortAddress: e.target.value })}
                    placeholder="Vidya Nagar, Hubballi – 580021"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maps-url" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Google Maps Link URL
                  </Label>
                  <Input
                    id="maps-url"
                    value={contactForm?.mapsUrl || ""}
                    onChange={(e) => setContactForm({ ...contactForm, mapsUrl: e.target.value })}
                    placeholder="https://maps.app.goo.gl/..."
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full font-bold gap-2">
                <Save className="size-4" /> Save Contact Controls
              </Button>
            </form>

            {/* Live Preview Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-navy-deep text-white p-6 rounded-2xl border border-accent/40 shadow-lg">
                <h3 className="text-sm font-bold tracking-widest text-accent uppercase flex items-center gap-2">
                  <Eye className="size-4" /> Live Website Preview
                </h3>
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">Top Bar Phone:</span>
                    <span className="font-bold text-accent font-mono">📞 {contactForm.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">Official Email:</span>
                    <span className="font-semibold text-white break-all">{contactForm.email}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">WhatsApp Button:</span>
                    <span className="font-bold text-[#25D366] truncate max-w-[180px]">{contactForm.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-white/70 block mb-1">Office Location:</span>
                    <span className="text-white/90 leading-snug">{contactForm.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Services Management */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background p-6 rounded-2xl border border-border shadow-md">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Wrench className="size-5 text-accent" /> Website Services & Offerings
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage security, housekeeping, gardening, manpower and custom services displayed across the website.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResetServices}
                  className="text-xs font-semibold gap-1.5"
                >
                  <RotateCcw className="size-3.5 text-muted-foreground" />
                  <span>Reset Defaults</span>
                </Button>

                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  onClick={openCreateServiceModal}
                  className="text-xs font-bold gap-1.5 shadow-md"
                >
                  <Plus className="size-4" />
                  <span>Add New Service</span>
                </Button>
              </div>
            </div>

            {/* Services Cards List */}
            {safeServices.length === 0 ? (
              <div className="card-elevated bg-background p-12 text-center rounded-2xl border border-border">
                <Wrench className="mx-auto size-12 text-muted-foreground/40 mb-3" />
                <h3 className="text-lg font-bold text-foreground">No Services Found</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                  You have deleted all services. Click "Add New Service" above or reset to default services.
                </p>
                <Button variant="gold" size="lg" className="mt-6 font-bold gap-2" onClick={handleResetServices}>
                  <RotateCcw className="size-4" /> Restore Default Services
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {safeServices.map((service, index) => {
                  const ServiceIcon = getServiceIcon(service.iconName);

                  return (
                    <div
                      key={service.id}
                      className={`card-elevated flex flex-col justify-between p-6 rounded-2xl border transition-all ${
                        !service.isActive
                          ? "opacity-60 bg-muted/30 border-dashed border-border"
                          : "bg-background border-border hover:border-accent/50"
                      }`}
                    >
                      <div>
                        {/* Top Header of Card */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-xl bg-navy-gradient text-primary-foreground shadow-sm shrink-0">
                              <ServiceIcon className="size-6 text-accent" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                                {service.badge && (
                                  <span className="inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent border border-accent/30">
                                    {service.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-muted-foreground font-mono">
                                Icon: {service.iconName}
                              </span>
                            </div>
                          </div>

                          {/* Quick Status Toggles */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                updateService(service.id, { isFeatured: !service.isFeatured })
                              }
                              className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                                service.isFeatured
                                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                  : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                              }`}
                              title={service.isFeatured ? "Featured on Home Page" : "Not featured on Home"}
                            >
                              <Star className="size-3 fill-current" />
                              <span>{service.isFeatured ? "Featured" : "Standard"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateService(service.id, { isActive: !service.isActive })
                              }
                              className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors ${
                                service.isActive
                                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800"
                              }`}
                              title={service.isActive ? "Active on website" : "Hidden from website"}
                            >
                              {service.isActive ? "Active" : "Hidden"}
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>

                        {/* Offerings Bullet Points */}
                        {service.items && service.items.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-border">
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                              Key Offerings ({service.items.length}):
                            </span>
                            <ul className="grid gap-1.5 sm:grid-cols-2 text-xs">
                              {service.items.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5 text-foreground/80">
                                  <Check className="size-3.5 text-accent shrink-0" />
                                  <span className="truncate">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Actions Footer */}
                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveService(index, "up")}
                            disabled={index === 0}
                            className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveService(index, "down")}
                            disabled={index === services.length - 1}
                            className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="size-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openEditServiceModal(service)}
                            className="text-xs font-semibold gap-1"
                          >
                            <Edit3 className="size-3.5 text-accent" /> Edit
                          </Button>
                          <button
                            type="button"
                            onClick={() => handleDeleteService(service.id, service.title)}
                            className="p-2 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal Dialog for Create / Edit Service */}
            {isServiceModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
                <div className="w-full max-w-2xl bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Wrench className="size-5 text-accent" />
                        {editingServiceId ? "Edit Service" : "Add New Service"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {editingServiceId
                          ? "Modify service details, icon, bullet offerings and display status."
                          : "Create a new service offering to display on your website."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsServiceModalOpen(false)}
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="srv-title" className="font-bold">
                        Service Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="srv-title"
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="e.g., Security Services, Armed Security, Industrial Guarding"
                        required
                      />
                    </div>

                    {/* Icon Selection */}
                    <div className="space-y-2">
                      <Label className="font-bold">Service Icon</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-secondary/30">
                        {SERVICE_ICON_OPTIONS.map((opt) => {
                          const IconComp = opt.icon;
                          const isSelected = serviceForm.iconName === opt.name;
                          return (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => setServiceForm({ ...serviceForm, iconName: opt.name })}
                              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center ${
                                isSelected
                                  ? "bg-primary text-primary-foreground border-accent shadow-md scale-105"
                                  : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                              }`}
                            >
                              <IconComp className="size-5" />
                              <span className="text-[10px] font-semibold mt-1 truncate w-full">
                                {opt.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Badge Tag */}
                    <div className="space-y-2">
                      <Label htmlFor="srv-badge">Badge Tag (Optional)</Label>
                      <Input
                        id="srv-badge"
                        value={serviceForm.badge}
                        onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                        placeholder="e.g., 24/7 Support, Popular, Highly Requested"
                      />
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2">
                      <Label htmlFor="srv-desc" className="font-bold">
                        Short Description
                      </Label>
                      <Textarea
                        id="srv-desc"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        placeholder="Brief summary of what this service includes..."
                        rows={3}
                      />
                    </div>

                    {/* Offerings Bullet Points */}
                    <div className="space-y-2">
                      <Label htmlFor="srv-items" className="font-bold">
                        Key Offerings / Sub-Services (One per line)
                      </Label>
                      <Textarea
                        id="srv-items"
                        value={serviceForm.itemsText}
                        onChange={(e) => setServiceForm({ ...serviceForm, itemsText: e.target.value })}
                        placeholder={"Security Officers\nSecurity Supervisors\nGate control and access management\nCCTV monitoring"}
                        rows={4}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Enter each feature or sub-service on a new line. They will be displayed as bullet points.
                      </p>
                    </div>

                    {/* Switches / Checkboxes */}
                    <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border">
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={serviceForm.isFeatured}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, isFeatured: e.target.checked })
                          }
                          className="size-4 rounded border-border text-accent focus:ring-accent"
                        />
                        <div>
                          <span className="text-xs font-bold block text-foreground">Featured on Home</span>
                          <span className="text-[10px] text-muted-foreground">Show in homepage services grid</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={serviceForm.isActive}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, isActive: e.target.checked })
                          }
                          className="size-4 rounded border-border text-accent focus:ring-accent"
                        />
                        <div>
                          <span className="text-xs font-bold block text-foreground">Active Service</span>
                          <span className="text-[10px] text-muted-foreground">Visible on public pages</span>
                        </div>
                      </label>
                    </div>

                    {/* Modal Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsServiceModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="gold" className="font-bold gap-2">
                        <Save className="size-4" /> Save Service
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB: CLIENTS CONTROL ----------------- */}
        {activeTab === "clients" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-elevated p-6 bg-background">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Building2 className="size-6 text-accent" /> Client Panel Control
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage client showcase entries displayed on website homepage and about page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResetClients}
                  className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" /> Reset Defaults
                </Button>
                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  onClick={openAddClientModal}
                  className="font-bold gap-1.5 shadow-md"
                >
                  <Plus className="size-4" /> Add New Client
                </Button>
              </div>
            </div>

            {/* Clients Grid */}
            {safeClients.length === 0 ? (
              <div className="card-elevated p-12 text-center bg-background border border-dashed border-border">
                <Building2 className="size-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="text-base font-bold text-foreground">No Clients Added Yet</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Click "Add New Client" above or restore standard default clients (KMCRI, HESCOM, KHDC, Midmac, GWP, JMFC Court).
                </p>
                <Button
                  type="button"
                  variant="navy"
                  size="sm"
                  onClick={handleResetClients}
                  className="mt-4 text-xs font-bold"
                >
                  Restore Default Clients
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {safeClients.map((client: ClientItem, index: number) => (
                  <div
                    key={client.id || index}
                    className={`card-elevated p-6 flex flex-col justify-between border transition-all ${
                      client.isActive !== false
                        ? "bg-background border-border"
                        : "bg-secondary/40 border-border opacity-70"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-xl bg-navy-gradient text-accent font-bold shadow-xs">
                            <Building2 className="size-5" />
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-foreground leading-snug">{client.name}</h3>
                            {client.shortName && (
                              <span className="text-[11px] font-semibold text-accent uppercase tracking-wider block">
                                {client.shortName}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => updateClient(client.id, { isActive: !client.isActive })}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                            client.isActive !== false
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                              : "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800"
                          }`}
                          title={client.isActive !== false ? "Active on website" : "Hidden from website"}
                        >
                          {client.isActive !== false ? "Active" : "Hidden"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {client.location && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-secondary px-2.5 py-0.5 rounded-md text-muted-foreground border border-border">
                            <MapPin className="size-3 text-accent" /> {client.location}
                          </span>
                        )}
                        {client.category && (
                          <span className="inline-flex items-center text-[11px] font-semibold bg-accent/10 px-2.5 py-0.5 rounded-md text-accent border border-accent/20">
                            {client.category}
                          </span>
                        )}
                        {client.badge && (
                          <span className="inline-flex items-center text-[11px] font-bold bg-navy-deep text-white px-2 py-0.5 rounded-md">
                            {client.badge}
                          </span>
                        )}
                      </div>

                      {client.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mt-2">
                          {client.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveClient(index, "up")}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveClient(index, "down")}
                          disabled={index === safeClients.length - 1}
                          className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => openEditClientModal(client)}
                          className="text-xs font-semibold gap-1"
                        >
                          <Edit3 className="size-3.5 text-accent" /> Edit
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClient(client.id, client.name)}
                          className="p-2 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Dialog for Add / Edit Client */}
            {isClientModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
                <div className="w-full max-w-xl bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Building2 className="size-5 text-accent" />
                        {editingClientId ? "Edit Client Details" : "Add New Client"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {editingClientId
                          ? "Update organization name, location, category, badge or visibility status."
                          : "Add a new client to showcase on your website panel."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsClientModalOpen(false)}
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveClient} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="cli-name" className="font-bold">
                        Client Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cli-name"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        placeholder="e.g. KMCRI, Vidyanagar, Hubli"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Short Name */}
                      <div className="space-y-1.5">
                        <Label htmlFor="cli-short">Short Name / Code</Label>
                        <Input
                          id="cli-short"
                          value={clientForm.shortName}
                          onChange={(e) => setClientForm({ ...clientForm, shortName: e.target.value })}
                          placeholder="e.g. KMCRI, HESCOM, KHDC"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5">
                        <Label htmlFor="cli-loc">Location</Label>
                        <Input
                          id="cli-loc"
                          value={clientForm.location}
                          onChange={(e) => setClientForm({ ...clientForm, location: e.target.value })}
                          placeholder="e.g. Vidyanagar, Hubli"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="space-y-1.5">
                        <Label htmlFor="cli-cat">Sector / Category</Label>
                        <Input
                          id="cli-cat"
                          value={clientForm.category}
                          onChange={(e) => setClientForm({ ...clientForm, category: e.target.value })}
                          placeholder="e.g. Public Sector Utility"
                        />
                      </div>

                      {/* Badge Tag */}
                      <div className="space-y-1.5">
                        <Label htmlFor="cli-badge">Badge Tag (Optional)</Label>
                        <Input
                          id="cli-badge"
                          value={clientForm.badge}
                          onChange={(e) => setClientForm({ ...clientForm, badge: e.target.value })}
                          placeholder="e.g. Healthcare & Education"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <Label htmlFor="cli-desc">Description & Security Details</Label>
                      <Textarea
                        id="cli-desc"
                        rows={3}
                        value={clientForm.description}
                        onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                        placeholder="Brief overview of security/manpower services provided to this client."
                      />
                    </div>

                    {/* Website URL */}
                    <div className="space-y-1.5">
                      <Label htmlFor="cli-url">Website Link (Optional)</Label>
                      <Input
                        id="cli-url"
                        type="url"
                        value={clientForm.websiteUrl}
                        onChange={(e) => setClientForm({ ...clientForm, websiteUrl: e.target.value })}
                        placeholder="e.g. https://midmac.in/ or https://www.gwp-solutions.com/"
                      />
                    </div>

                    {/* Active Status Checkbox */}
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={clientForm.isActive}
                        onChange={(e) => setClientForm({ ...clientForm, isActive: e.target.checked })}
                        className="size-4 rounded border-border text-accent focus:ring-accent"
                      />
                      <div>
                        <span className="text-xs font-bold block text-foreground">Active Client</span>
                        <span className="text-[10px] text-muted-foreground">Visible on public client showcase</span>
                      </div>
                    </label>

                    {/* Modal Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsClientModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="gold" className="font-bold gap-2">
                        <Save className="size-4" /> Save Client
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Branding & Slogans */}
        {activeTab === "branding" && (
          <form onSubmit={saveCompanyChanges} className="max-w-3xl space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Building className="size-5 text-accent" /> Company Branding & Slogans
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Customize website title, slogans, mottos, and tagline.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="comp-name">Company Full Name</Label>
                <Input
                  id="comp-name"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comp-short">Short Name</Label>
                <Input
                  id="comp-short"
                  value={companyForm.short}
                  onChange={(e) => setCompanyForm({ ...companyForm, short: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-motto">Official Motto Text</Label>
              <Input
                id="comp-motto"
                value={companyForm.motto}
                onChange={(e) => setCompanyForm({ ...companyForm, motto: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-primary-slogan">Primary Slogan</Label>
              <Input
                id="comp-primary-slogan"
                value={companyForm.primarySlogan}
                onChange={(e) => setCompanyForm({ ...companyForm, primarySlogan: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-secondary-slogan">Secondary Slogan</Label>
              <Input
                id="comp-secondary-slogan"
                value={companyForm.secondarySlogan}
                onChange={(e) => setCompanyForm({ ...companyForm, secondarySlogan: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-tagline">Tagline / Services Summary</Label>
              <Input
                id="comp-tagline"
                value={companyForm.tagline}
                onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full font-bold gap-2">
              <Save className="size-4" /> Save Branding Settings
            </Button>
          </form>
        )}

        {/* TAB 3: Top Announcement Banner */}
        {activeTab === "banner" && (
          <form onSubmit={saveBannerChanges} className="max-w-3xl space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Bell className="size-5 text-accent" /> Top Header Announcement Banner
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Display emergency alerts, announcements, or campaign headlines at the very top of every page.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-secondary p-4 border border-border">
              <div>
                <Label htmlFor="show-banner-toggle" className="font-bold text-sm text-foreground cursor-pointer">
                  Show Top Header Banner
                </Label>
                <p className="text-xs text-muted-foreground">Toggle visibility on the website</p>
              </div>
              <input
                id="show-banner-toggle"
                type="checkbox"
                checked={bannerForm.showTopBanner}
                onChange={(e) => setBannerForm({ ...bannerForm, showTopBanner: e.target.checked })}
                className="size-5 accent-accent cursor-pointer"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="banner-badge">Badge Text / Label</Label>
                <Input
                  id="banner-badge"
                  value={bannerForm.bannerBadge}
                  onChange={(e) => setBannerForm({ ...bannerForm, bannerBadge: e.target.value })}
                  placeholder="e.g. 24/7 SUPPORT"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-text">Announcement Message</Label>
                <Input
                  id="banner-text"
                  value={bannerForm.bannerText}
                  onChange={(e) => setBannerForm({ ...bannerForm, bannerText: e.target.value })}
                  placeholder="e.g. Rapid Response Team Active"
                />
              </div>
            </div>

            {/* Live Banner Preview */}
            <div className="mt-6 border-t border-border pt-4">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Live Banner Preview:</h4>
              <div className="bg-navy-deep text-white p-3 rounded-lg border border-accent/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-accent tracking-wider uppercase bg-accent/20 px-2 py-0.5 rounded text-[10px]">
                    {bannerForm.bannerBadge || "ANNOUNCEMENT"}
                  </span>
                  <span>{bannerForm.bannerText || "Banner text goes here..."}</span>
                </div>
                <span className="text-[10px] text-white/50">{bannerForm.showTopBanner ? "Visible" : "Hidden"}</span>
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full font-bold gap-2">
              <Save className="size-4" /> Save Banner Settings
            </Button>
          </form>
        )}

        {/* TAB 4: Feature Toggles */}
        {activeTab === "toggles" && (
          <form onSubmit={saveToggleChanges} className="max-w-3xl space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sliders className="size-5 text-accent" /> Website Feature Controls
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Enable or disable interactive widgets across desktop and mobile views.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-secondary p-4 border border-border">
                <div>
                  <Label htmlFor="toggle-floating-hub" className="font-bold text-sm text-foreground cursor-pointer">
                    Floating Contact Hub (Desktop)
                  </Label>
                  <p className="text-xs text-muted-foreground">Floating Call, WhatsApp & Quote buttons at bottom-right of screen.</p>
                </div>
                <input
                  id="toggle-floating-hub"
                  type="checkbox"
                  checked={toggleForm.showFloatingContactHub}
                  onChange={(e) => setToggleForm({ ...toggleForm, showFloatingContactHub: e.target.checked })}
                  className="size-5 accent-accent cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary p-4 border border-border">
                <div>
                  <Label htmlFor="toggle-mobile-bar" className="font-bold text-sm text-foreground cursor-pointer">
                    Mobile Quick Action Bar
                  </Label>
                  <p className="text-xs text-muted-foreground">Sticky action bar at bottom of mobile phones (Call, WhatsApp, Quote).</p>
                </div>
                <input
                  id="toggle-mobile-bar"
                  type="checkbox"
                  checked={toggleForm.showMobileBar}
                  onChange={(e) => setToggleForm({ ...toggleForm, showMobileBar: e.target.checked })}
                  className="size-5 accent-accent cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary p-4 border border-border">
                <div>
                  <Label htmlFor="toggle-quote-modal" className="font-bold text-sm text-foreground cursor-pointer">
                    Quote Request Modal System
                  </Label>
                  <p className="text-xs text-muted-foreground">Popup quote request form accessible from "Get a Quote" buttons.</p>
                </div>
                <input
                  id="toggle-quote-modal"
                  type="checkbox"
                  checked={toggleForm.enableQuoteModal}
                  onChange={(e) => setToggleForm({ ...toggleForm, enableQuoteModal: e.target.checked })}
                  className="size-5 accent-accent cursor-pointer"
                />
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full font-bold gap-2">
              <Save className="size-4" /> Save Feature Toggles
            </Button>
          </form>
        )}

        {/* TAB 5: Quotes & Enquiries */}
        {activeTab === "quotes" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-background p-6 rounded-2xl border border-border shadow-md">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="size-5 text-accent" /> Received Quote Requests & Enquiries
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage enquiries submitted by potential clients through the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Filter:</span>
                {(["all", "new", "contacted", "resolved"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setQuoteFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors ${
                      quoteFilter === filter
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "bg-secondary text-muted-foreground hover:bg-accent/20"
                    }`}
                  >
                    {filter} ({safeQuotes.filter((q) => (filter === "all" ? true : q.status === filter)).length})
                  </button>
                ))}

                {safeQuotes.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Clear all received quotes log?")) {
                        clearAllQuotes();
                        toast.info("Quotes log cleared.");
                      }
                    }}
                    className="border-red-300 text-red-600 hover:bg-red-50 text-xs ml-2"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {filteredQuotes.length === 0 ? (
              <div className="text-center py-16 bg-background rounded-2xl border border-dashed border-border p-8">
                <MessageSquare className="mx-auto size-12 text-muted-foreground/40" />
                <h3 className="mt-4 text-base font-bold text-foreground">No enquiries found</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {quoteFilter === "all"
                    ? "When clients submit quotes or contact forms, they will appear right here."
                    : `No entries matching filter '${quoteFilter}'.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    className={`card-elevated bg-background p-6 rounded-xl border relative flex flex-col justify-between ${
                      q.status === "new" ? "border-accent/80 shadow-lg ring-1 ring-accent/30" : "border-border"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-border pb-3 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              q.status === "new"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : q.status === "contacted"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}
                          >
                            {q.status}
                          </span>
                          {q.type && (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                q.type === "career"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                  : q.type === "contact"
                                  ? "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                              }`}
                            >
                              {q.type === "career" ? "Career" : q.type === "contact" ? "Enquiry" : "Quote"}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                          <Clock className="size-3" /> {q.date}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-foreground">{q.name}</h3>
                      <div className="mt-2 space-y-1 text-xs">
                        <p className="font-semibold text-primary flex items-center gap-1.5 font-mono">
                          <Phone className="size-3.5 text-accent" />
                          <a href={`tel:${q.phone}`} className="hover:underline">
                            {q.phone}
                          </a>
                        </p>
                        {q.email && (
                          <p className="text-muted-foreground flex items-center gap-1.5 break-all">
                            <Mail className="size-3.5 text-accent" /> {q.email}
                          </p>
                        )}
                        {q.organization && (
                          <p className="text-muted-foreground font-medium">
                            🏢 <span className="text-foreground">{q.organization}</span>
                          </p>
                        )}
                        <p className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded inline-block mt-2">
                          Service: {q.service}
                        </p>
                      </div>

                      {q.message && (
                        <div className="mt-3 p-3 rounded-lg bg-secondary/80 text-xs text-foreground/90 italic leading-relaxed border border-border">
                          "{q.message}"
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-border pt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {q.status !== "contacted" && (
                          <button
                            type="button"
                            onClick={() => {
                              updateQuoteStatus(q.id, "contacted");
                              toast.info("Marked as Contacted");
                            }}
                            className="px-2.5 py-1 rounded text-[11px] font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          >
                            Contacted
                          </button>
                        )}
                        {q.status !== "resolved" && (
                          <button
                            type="button"
                            onClick={() => {
                              updateQuoteStatus(q.id, "resolved");
                              toast.success("Marked as Resolved");
                            }}
                            className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          deleteQuoteSubmission(q.id);
                          toast.info("Submission deleted");
                        }}
                        className="p-1.5 rounded text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete enquiry"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Security & Reset */}
        {activeTab === "security" && (
          <div className="grid gap-8 md:grid-cols-2">
            <form onSubmit={handlePasscodeChange} className="space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="size-5 text-accent" /> Change Admin Passcode
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Update the password required to log into this Admin Panel.
                </p>
              </div>

              {/* Display Current Active Passcode */}
              <div className="p-4 rounded-xl bg-secondary/80 border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Current Active Passcode
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground tracking-wider">
                    {showCurrentPasscode ? passcode : "••••••••"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCurrentPasscode(!showCurrentPasscode)}
                  className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors text-xs flex items-center gap-1 font-medium border border-border"
                >
                  {showCurrentPasscode ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  <span>{showCurrentPasscode ? "Hide" : "Reveal"}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-passcode">New Passcode</Label>
                  <div className="relative">
                    <Input
                      id="new-passcode"
                      type={showNewPasscode ? "text" : "password"}
                      value={newPasscodeForm}
                      onChange={(e) => setNewPasscodeForm(e.target.value)}
                      placeholder="Enter new passcode (min 4 chars)"
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPasscode(!showNewPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showNewPasscode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-passcode">Confirm New Passcode</Label>
                  <div className="relative">
                    <Input
                      id="confirm-passcode"
                      type={showNewPasscode ? "text" : "password"}
                      value={confirmPasscodeForm}
                      onChange={(e) => setConfirmPasscodeForm(e.target.value)}
                      placeholder="Confirm new passcode"
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPasscode(!showNewPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showNewPasscode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full font-bold gap-2">
                <Save className="size-4" /> Save New Passcode
              </Button>
            </form>

            <div className="space-y-6 bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2 text-red-600">
                  <RotateCcw className="size-5" /> Reset Site Controls
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Restore all contact numbers, mobile settings, mottos, and feature toggles back to the default system configuration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
                <p className="font-bold">⚠️ Warning:</p>
                <p className="mt-1">
                  This action will erase any custom mobile numbers or mottos saved in the Admin Panel and revert them back to default `site.ts` values.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleResetDefaults}
                className="w-full border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-bold gap-2"
              >
                <RotateCcw className="size-4" /> Reset All Controls to Default
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
