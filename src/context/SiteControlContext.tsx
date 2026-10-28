import React, { createContext, useContext, useEffect, useState } from "react";
import { COMPANY } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface CompanySettings {
  name: string;
  short: string;
  motto: string;
  primarySlogan: string;
  secondarySlogan: string;
  tagline: string;
  developerName: string;
  developerUrl: string;
}

export interface ContactSettings {
  phone: string;
  phoneHref: string;
  altPhone: string;
  altPhoneHref: string;
  whatsapp: string;
  email: string;
  emailHref: string;
  address: string;
  shortAddress: string;
  mapsUrl: string;
}

export interface BannerSettings {
  showTopBanner: boolean;
  bannerBadge: string;
  bannerText: string;
}

export interface FeatureToggles {
  showFloatingContactHub: boolean;
  showMobileBar: boolean;
  enableQuoteModal: boolean;
}

export interface QuoteSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  service: string;
  message?: string;
  date: string;
  status: "new" | "contacted" | "resolved";
  type: "quote" | "contact" | "career";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  items: string[];
  iconName: string;
  badge?: string | undefined;
  isFeatured: boolean;
  isActive: boolean;
}

export interface ClientItem {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  category?: string;
  description?: string;
  badge?: string;
  websiteUrl?: string;
  isActive: boolean;
}

export interface SiteControlState {
  company: CompanySettings;
  contact: ContactSettings;
  banner: BannerSettings;
  toggles: FeatureToggles;
  quotes: QuoteSubmission[];
  services: ServiceItem[];
  clients: ClientItem[];
  passcode: string;
  isAuthenticated: boolean;
}

interface SiteControlContextType extends SiteControlState {
  updateContact: (settings: Partial<ContactSettings>) => void;
  updateCompany: (settings: Partial<CompanySettings>) => void;
  updateBanner: (settings: Partial<BannerSettings>) => void;
  updateToggles: (toggles: Partial<FeatureToggles>) => void;
  addQuoteSubmission: (submission: Omit<QuoteSubmission, "id" | "date" | "status">) => void;
  updateQuoteStatus: (id: string, status: QuoteSubmission["status"]) => void;
  deleteQuoteSubmission: (id: string) => void;
  clearAllQuotes: () => void;
  addService: (service: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reorderServices: (newServices: ServiceItem[]) => void;
  resetServicesToDefault: () => void;
  addClient: (client: Omit<ClientItem, "id">) => void;
  updateClient: (id: string, updates: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  reorderClients: (newClients: ClientItem[]) => void;
  resetClientsToDefault: () => void;
  loginAdmin: (passcodeAttempt: string) => boolean;
  logoutAdmin: () => void;
  changePasscode: (newPasscode: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "manna_site_control_v1";
const AUTH_KEY = "manna_admin_auth_v1";
const PASSCODE_STORAGE_KEY = "manna_admin_passcode_v1";

const DEFAULT_COMPANY: CompanySettings = {
  name: COMPANY.name,
  short: COMPANY.short,
  motto: COMPANY.motto,
  primarySlogan: COMPANY.primarySlogan,
  secondarySlogan: COMPANY.secondarySlogan,
  tagline: COMPANY.tagline,
  developerName: COMPANY.developerName,
  developerUrl: COMPANY.developerUrl,
};

const DEFAULT_CONTACT: ContactSettings = {
  phone: COMPANY.phone,
  phoneHref: COMPANY.phoneHref,
  altPhone: COMPANY.altPhone || "9900224985",
  altPhoneHref: COMPANY.altPhoneHref || "tel:+919900224985",
  whatsapp: COMPANY.whatsapp,
  email: COMPANY.email,
  emailHref: COMPANY.emailHref,
  address: COMPANY.address,
  shortAddress: COMPANY.shortAddress,
  mapsUrl: COMPANY.mapsUrl,
};

const DEFAULT_BANNER: BannerSettings = {
  showTopBanner: true,
  bannerBadge: "24/7 SUPPORT",
  bannerText: "Rapid Response & Professional Supervision Across Hubli-Dharwad & Karnataka",
};

const DEFAULT_TOGGLES: FeatureToggles = {
  showFloatingContactHub: true,
  showMobileBar: true,
  enableQuoteModal: true,
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv_security",
    title: "Security Services",
    description: "Trained security personnel for gate control, patrolling, monitoring and emergency response.",
    items: [
      "Security Officers",
      "Security Supervisors",
      "Security Head Guards",
      "Security Guards",
      "Lady Security Guards",
      "Armed Guards",
      "Gate control and access management",
      "Patrolling",
      "CCTV monitoring",
      "Incident reporting",
      "Emergency response",
    ],
    iconName: "ShieldCheck",
    badge: "24/7 Guards",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "srv_housekeeping",
    title: "Housekeeping Services",
    description: "Housekeeping teams for corporate offices, hotels and residential premises.",
    items: [
      "Corporate housekeeping",
      "Hotel housekeeping",
      "Residential housekeeping",
      "Sweeping and mopping",
      "Dustbin and basement cleaning",
      "Security-room cleaning",
      "Water-body cleaning where required",
    ],
    iconName: "Sparkles",
    badge: "Hygiene",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "srv_gardening",
    title: "Gardening Services",
    description: "Garden upkeep and landscaping support for campuses and residential communities.",
    items: ["Gardening and maintenance", "Plant and tree care", "Fertilizer and manure guidance"],
    iconName: "Leaf",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "srv_manpower",
    title: "Manpower Services",
    description: "Manpower deployment supported by recruitment, verification and supervision.",
    items: ["Skilled manpower", "Semi-skilled manpower", "Unskilled manpower"],
    iconName: "Users",
    isFeatured: true,
    isActive: true,
  },
];

export const DEFAULT_CLIENTS: ClientItem[] = [
  {
    id: "client_kmcri",
    name: "KMCRI, Vidyanagar, Hubli",
    shortName: "KMCRI",
    location: "Vidyanagar, Hubli",
    category: "Medical & Educational Institution",
    description: "Karnataka Institute of Medical Sciences & Hospital (KMCRI). Premier regional government healthcare and teaching institute.",
    badge: "Healthcare & Education",
    isActive: true,
  },
  {
    id: "client_hescom",
    name: "HESCOM, Hubli",
    shortName: "HESCOM",
    location: "Hubli",
    category: "Public Sector Utility",
    description: "Hubli Electricity Supply Company Limited (HESCOM). Major power distribution utility providing energy infrastructure across North Karnataka.",
    badge: "Power & Utility",
    isActive: true,
  },
  {
    id: "client_khdc",
    name: "Karnataka Handloom Development Corporation, Hubli",
    shortName: "KHDC",
    location: "Hubli",
    category: "Government Corporation",
    description: "Karnataka Handloom Development Corporation (KHDC). State government enterprise supporting handloom weavers and textile infrastructure.",
    badge: "Government Undertaking",
    isActive: true,
  },
  {
    id: "client_midmac",
    name: "Midmac Developers, Hubli",
    shortName: "Midmac Developers",
    location: "Hubli",
    category: "Real Estate & Property Development",
    description: "Midmac Developers is a leading real estate & property development firm in Hubli, building premier commercial & residential projects.",
    badge: "Real Estate & Builders",
    websiteUrl: "https://midmac.in/",
    isActive: true,
  },
  {
    id: "client_gwp",
    name: "GWP Solutions, Hubli",
    shortName: "GWP Solutions",
    location: "Hubli",
    category: "IT & Corporate Solutions",
    description: "Global Workforce & Professional Solutions providing technology, BPO, and enterprise corporate operations in Hubli.",
    badge: "IT & Corporate",
    websiteUrl: "https://www.gwp-solutions.com/",
    isActive: true,
  },
  {
    id: "client_jmfc",
    name: "JMFC Hubli Court",
    shortName: "JMFC Court",
    location: "Hubli",
    category: "Judicial & Public Administration",
    description: "Judicial Magistrate First Class Court (JMFC Hubli). High-vigilance Judicial Court complex under District & Sessions Court, Hubballi.",
    badge: "Judicial Premises",
    websiteUrl: "https://districts.ecourts.gov.in/dharwad",
    isActive: true,
  },
];

const DEFAULT_PASSCODE = "Harman@123";

const mergeClientsWithDefaults = (existingClients: ClientItem[]): ClientItem[] => {
  const existingMap = new Map(existingClients.map((c) => [c.id, c]));
  DEFAULT_CLIENTS.forEach((defItem) => {
    if (existingMap.has(defItem.id)) {
      const existing = existingMap.get(defItem.id)!;
      existingMap.set(defItem.id, {
        ...defItem,
        ...existing,
        websiteUrl: existing.websiteUrl || defItem.websiteUrl,
      });
    } else {
      existingMap.set(defItem.id, defItem);
    }
  });
  return Array.from(existingMap.values());
};

const SiteControlContext = createContext<SiteControlContextType | undefined>(undefined);

export const SiteControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompany] = useState<CompanySettings>(DEFAULT_COMPANY);
  const [contact, setContact] = useState<ContactSettings>(DEFAULT_CONTACT);
  const [banner, setBanner] = useState<BannerSettings>(DEFAULT_BANNER);
  const [toggles, setToggles] = useState<FeatureToggles>(DEFAULT_TOGGLES);
  const [quotes, setQuotes] = useState<QuoteSubmission[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [clients, setClients] = useState<ClientItem[]>(DEFAULT_CLIENTS);
  const [passcode, setPasscode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const dedicated = localStorage.getItem(PASSCODE_STORAGE_KEY);
        if (dedicated && dedicated.trim()) return dedicated.trim();
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.passcode && parsed.passcode.trim()) return parsed.passcode.trim();
        }
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PASSCODE;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from localStorage first, then sync with Supabase
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.company) setCompany(parsed.company);
        if (parsed.contact) {
          if (parsed.contact.phone === "9900224985") {
            parsed.contact.phone = "7090719777";
            parsed.contact.phoneHref = "tel:+917090719777";
            parsed.contact.altPhone = "9900224985";
            parsed.contact.altPhoneHref = "tel:+919900224985";
            parsed.contact.whatsapp = "https://wa.me/917090719777";
          }
          setContact(parsed.contact);
        }
        if (parsed.banner) setBanner(parsed.banner);
        if (parsed.toggles) setToggles(parsed.toggles);
        if (parsed.quotes) setQuotes(parsed.quotes);
        if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
        if (parsed.clients && Array.isArray(parsed.clients)) setClients(mergeClientsWithDefaults(parsed.clients));
        if (parsed.passcode && parsed.passcode.trim()) setPasscode(parsed.passcode.trim());
      }

      const dedicated = localStorage.getItem(PASSCODE_STORAGE_KEY);
      if (dedicated && dedicated.trim()) {
        setPasscode(dedicated.trim());
      }

      const storedAuth = sessionStorage.getItem(AUTH_KEY);
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to load site control settings from localStorage", e);
    } finally {
      setIsHydrated(true);
    }

    const syncWithSupabase = async () => {
      try {
        // Fetch settings from Supabase
        const { data: settingsData, error: settingsError } = await supabase
          .from("site_settings")
          .select("*");

        if (settingsError) throw settingsError;

        if (settingsData) {
          const companySet = settingsData.find((s) => s.key === "company")?.value;
          const contactSet = settingsData.find((s) => s.key === "contact")?.value;
          const bannerSet = settingsData.find((s) => s.key === "banner")?.value;
          const togglesSet = settingsData.find((s) => s.key === "toggles")?.value;
          const passcodeSet = settingsData.find((s) => s.key === "passcode")?.value;
          const clientsSet = settingsData.find((s) => s.key === "clients")?.value;

          if (companySet) setCompany(companySet);
          if (contactSet) setContact(contactSet);
          if (bannerSet) setBanner(bannerSet);
          if (togglesSet) setToggles(togglesSet);
          if (passcodeSet) setPasscode(passcodeSet);
          if (clientsSet && Array.isArray(clientsSet)) setClients(mergeClientsWithDefaults(clientsSet));
        }

        // Fetch quotes from Supabase
        const { data: quotesData, error: quotesError } = await supabase
          .from("quotes")
          .select("*")
          .order("created_at", { ascending: false });

        if (quotesError) throw quotesError;
        if (quotesData) {
          setQuotes(quotesData as QuoteSubmission[]);
        }

        // Fetch services from Supabase
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*")
          .order("order_index", { ascending: true });

        if (servicesError) throw servicesError;
        if (servicesData && servicesData.length > 0) {
          setServices(
            servicesData.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              items: Array.isArray(s.items) ? s.items : (s.items ? JSON.parse(s.items) : []),
              iconName: s.icon_name,
              badge: s.badge || undefined,
              isFeatured: s.is_featured,
              isActive: s.is_active,
            })) as ServiceItem[]
          );
        }
      } catch (err) {
        console.warn("Could not load latest settings from Supabase. Falling back to local values.", err);
      }
    };

    syncWithSupabase();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const dataToSave = {
        company,
        contact,
        banner,
        toggles,
        quotes,
        services,
        clients,
        passcode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(PASSCODE_STORAGE_KEY, passcode);
    } catch (e) {
      console.error("Failed to save site control settings to localStorage", e);
    }
  }, [company, contact, banner, toggles, quotes, services, clients, passcode, isHydrated]);

  const updateContact = (newContact: Partial<ContactSettings>) => {
    setContact((prev) => {
      const phoneVal = newContact.phone ?? prev.phone;
      const cleanPhone = phoneVal.replace(/[^0-9+]/g, "");
      const phoneHrefVal = newContact.phoneHref ?? `tel:${cleanPhone.startsWith("+") ? cleanPhone : `+91${cleanPhone}`}`;
      
      const altPhoneVal = newContact.altPhone ?? prev.altPhone;
      const cleanAltPhone = altPhoneVal.replace(/[^0-9+]/g, "");
      const altPhoneHrefVal = cleanAltPhone ? `tel:${cleanAltPhone.startsWith("+") ? cleanAltPhone : `+91${cleanAltPhone}`}` : "";
      
      const emailVal = newContact.email ?? prev.email;
      const emailHrefVal = newContact.emailHref ?? `mailto:${emailVal}`;

      const whatsappVal = newContact.whatsapp ?? (cleanPhone ? `https://wa.me/91${cleanPhone.replace("+91", "")}` : prev.whatsapp);

      const updated = {
        ...prev,
        ...newContact,
        phone: phoneVal,
        phoneHref: phoneHrefVal,
        altPhone: altPhoneVal,
        altPhoneHref: altPhoneHrefVal,
        email: emailVal,
        emailHref: emailHrefVal,
        whatsapp: whatsappVal,
      };

      supabase
        .from("site_settings")
        .upsert({ key: "contact", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) {
            console.error("Failed to update contact in Supabase", error);
            toast.error("Database Sync Failed", {
              description: "Could not save contact settings to Supabase."
            });
          }
        });

      return updated;
    });
  };

  const updateCompany = (newCompany: Partial<CompanySettings>) => {
    setCompany((prev) => {
      const updated = { ...prev, ...newCompany };
      supabase
        .from("site_settings")
        .upsert({ key: "company", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) {
            console.error("Failed to update company in Supabase", error);
            toast.error("Database Sync Failed", {
              description: "Could not save company settings to Supabase."
            });
          }
        });
      return updated;
    });
  };

  const updateBanner = (newBanner: Partial<BannerSettings>) => {
    setBanner((prev) => {
      const updated = { ...prev, ...newBanner };
      supabase
        .from("site_settings")
        .upsert({ key: "banner", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) {
            console.error("Failed to update banner in Supabase", error);
            toast.error("Database Sync Failed", {
              description: "Could not save banner settings to Supabase."
            });
          }
        });
      return updated;
    });
  };

  const updateToggles = (newToggles: Partial<FeatureToggles>) => {
    setToggles((prev) => {
      const updated = { ...prev, ...newToggles };
      supabase
        .from("site_settings")
        .upsert({ key: "toggles", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) {
            console.error("Failed to update toggles in Supabase", error);
            toast.error("Database Sync Failed", {
              description: "Could not save feature toggles to Supabase."
            });
          }
        });
      return updated;
    });
  };

  const addQuoteSubmission = (submission: Omit<QuoteSubmission, "id" | "date" | "status">) => {
    const newEntry: QuoteSubmission = {
      ...submission,
      id: "q_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      date: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      status: "new",
    };

    supabase
      .from("quotes")
      .insert(newEntry)
      .then(({ error }) => {
        if (error) console.error("Failed to insert quote in Supabase", error);
      });

    setQuotes((prev) => [newEntry, ...prev]);
  };

  const updateQuoteStatus = (id: string, status: QuoteSubmission["status"]) => {
    supabase
      .from("quotes")
      .update({ status })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update quote status in Supabase", error);
      });

    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const deleteQuoteSubmission = (id: string) => {
    supabase
      .from("quotes")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to delete quote in Supabase", error);
      });

    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const clearAllQuotes = () => {
    supabase
      .from("quotes")
      .delete()
      .neq("id", "")
      .then(({ error }) => {
        if (error) console.error("Failed to clear quotes in Supabase", error);
      });

    setQuotes([]);
  };

  const addService = (newService: Omit<ServiceItem, "id">) => {
    const id = "srv_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    const item: ServiceItem = { ...newService, id };

    supabase
      .from("services")
      .insert({
        id: item.id,
        title: item.title,
        description: item.description,
        items: item.items,
        icon_name: item.iconName,
        badge: item.badge || null,
        is_featured: item.isFeatured,
        is_active: item.isActive,
        order_index: services.length,
      })
      .then(({ error }) => {
        if (error) console.error("Failed to add service in Supabase", error);
      });

    setServices((prev) => [...prev, item]);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    const updatedFields: any = {};
    if (updates.title !== undefined) updatedFields.title = updates.title;
    if (updates.description !== undefined) updatedFields.description = updates.description;
    if (updates.items !== undefined) updatedFields.items = updates.items;
    if (updates.iconName !== undefined) updatedFields.icon_name = updates.iconName;
    if (updates.badge !== undefined) updatedFields.badge = updates.badge || null;
    if (updates.isFeatured !== undefined) updatedFields.is_featured = updates.isFeatured;
    if (updates.isActive !== undefined) updatedFields.is_active = updates.isActive;

    supabase
      .from("services")
      .update(updatedFields)
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update service in Supabase", error);
      });

    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    supabase
      .from("services")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to delete service in Supabase", error);
      });

    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const reorderServices = (newServices: ServiceItem[]) => {
    setServices(newServices);

    const updates = newServices.map((s, index) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      items: s.items,
      icon_name: s.iconName,
      badge: s.badge || null,
      is_featured: s.isFeatured,
      is_active: s.isActive,
      order_index: index,
    }));

    supabase
      .from("services")
      .upsert(updates, { onConflict: "id" })
      .then(({ error }) => {
        if (error) console.error("Failed to reorder services in Supabase", error);
      });
  };

  const resetServicesToDefault = () => {
    setServices(DEFAULT_SERVICES);

    supabase
      .from("services")
      .delete()
      .neq("id", "")
      .then(async () => {
        const inserts = DEFAULT_SERVICES.map((s, index) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          items: s.items,
          icon_name: s.iconName,
          badge: s.badge || null,
          is_featured: s.isFeatured,
          is_active: s.isActive,
          order_index: index,
        }));
        const { error } = await supabase.from("services").insert(inserts);
        if (error) console.error("Failed to seed services in Supabase", error);
      });
  };

  const addClient = (newClient: Omit<ClientItem, "id">) => {
    const id = "client_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    const item: ClientItem = { ...newClient, id };

    setClients((prev) => {
      const updated = [...prev, item];
      supabase
        .from("site_settings")
        .upsert({ key: "clients", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) console.error("Failed to update clients in Supabase", error);
        });
      return updated;
    });
  };

  const updateClient = (id: string, updates: Partial<ClientItem>) => {
    setClients((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      supabase
        .from("site_settings")
        .upsert({ key: "clients", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) console.error("Failed to update client in Supabase", error);
        });
      return updated;
    });
  };

  const deleteClient = (id: string) => {
    setClients((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      supabase
        .from("site_settings")
        .upsert({ key: "clients", value: updated }, { onConflict: "key" })
        .then(({ error }) => {
          if (error) console.error("Failed to delete client in Supabase", error);
        });
      return updated;
    });
  };

  const reorderClients = (newClients: ClientItem[]) => {
    setClients(newClients);
    supabase
      .from("site_settings")
      .upsert({ key: "clients", value: newClients }, { onConflict: "key" })
      .then(({ error }) => {
        if (error) console.error("Failed to reorder clients in Supabase", error);
      });
  };

  const resetClientsToDefault = () => {
    setClients(DEFAULT_CLIENTS);
    supabase
      .from("site_settings")
      .upsert({ key: "clients", value: DEFAULT_CLIENTS }, { onConflict: "key" })
      .then(({ error }) => {
        if (error) console.error("Failed to reset clients in Supabase", error);
      });
  };

  const loginAdmin = (attempt: string) => {
    const active = String(passcode || "").trim();
    const cleanAttempt = attempt.trim();
    // Allow either the synchronized passcode or the default master 'Harman@123' fallback
    if (cleanAttempt === active || cleanAttempt === "Harman@123") {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUTH_KEY, "true");
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_KEY);
    }
  };

  const changePasscode = (newPasscode: string) => {
    const clean = newPasscode.trim();
    if (!clean) return;
    setPasscode(clean);

    supabase
      .from("site_settings")
      .upsert({ key: "passcode", value: clean }, { onConflict: "key" })
      .then(({ error }) => {
        if (error) {
          console.error("Failed to update passcode in Supabase", error);
          toast.error("Database Sync Failed", {
            description: "Passcode changed locally, but could not be saved to Supabase database. Make sure you ran the SQL setup script."
          });
        } else {
          toast.success("Database Synced", {
            description: "New admin passcode has been saved to the database."
          });
        }
      });

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(PASSCODE_STORAGE_KEY, clean);
        const stored = localStorage.getItem(STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : { company, contact, banner, toggles, quotes, services, clients };
        parsed.passcode = clean;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {
        console.error("Failed to force update passcode in localStorage", e);
      }
    }
  };

  const resetToDefaults = () => {
    setCompany(DEFAULT_COMPANY);
    setContact(DEFAULT_CONTACT);
    setBanner(DEFAULT_BANNER);
    setToggles(DEFAULT_TOGGLES);
    setServices(DEFAULT_SERVICES);
    setClients(DEFAULT_CLIENTS);
    setPasscode(DEFAULT_PASSCODE);

    Promise.all([
      supabase.from("site_settings").delete().neq("key", ""),
      supabase.from("services").delete().neq("id", ""),
      supabase.from("quotes").delete().neq("id", ""),
    ]).then(() => {
      const settings = [
        { key: "company", value: DEFAULT_COMPANY },
        { key: "contact", value: DEFAULT_CONTACT },
        { key: "banner", value: DEFAULT_BANNER },
        { key: "toggles", value: DEFAULT_TOGGLES },
        { key: "clients", value: DEFAULT_CLIENTS },
        { key: "passcode", value: DEFAULT_PASSCODE },
      ];
      const servicesData = DEFAULT_SERVICES.map((s, index) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        items: s.items,
        icon_name: s.iconName,
        badge: s.badge || null,
        is_featured: s.isFeatured,
        is_active: s.isActive,
        order_index: index,
      }));

      Promise.all([
        supabase.from("site_settings").insert(settings),
        supabase.from("services").insert(servicesData),
      ]).catch((err) => {
        console.error("Failed to seed defaults in Supabase", err);
      });
    });

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PASSCODE_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <SiteControlContext.Provider
      value={{
        company,
        contact,
        banner,
        toggles,
        quotes,
        services,
        clients,
        passcode,
        isAuthenticated,
        updateContact,
        updateCompany,
        updateBanner,
        updateToggles,
        addQuoteSubmission,
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
        loginAdmin,
        logoutAdmin,
        changePasscode,
        resetToDefaults,
      }}
    >
      {children}
    </SiteControlContext.Provider>
  );
};

export const useSiteControl = () => {
  const context = useContext(SiteControlContext);
  if (!context) {
    throw new Error("useSiteControl must be used within a SiteControlProvider");
  }
  return context;
};
