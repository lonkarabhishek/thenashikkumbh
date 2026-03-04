"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ShieldAlert,
  Phone,
  Flame,
  Heart,
  MapPin,
  X,
  AlertTriangle,
  Siren,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { sosUI } from "@/i18n/sosTranslations";

interface EmergencyContact {
  key: string;
  number: string;
  icon: React.ReactNode;
  color: string;
}

export default function SOSButton() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [locationMsg, setLocationMsg] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
    setLocationMsg(null);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    setLocationMsg(null);
  }, []);

  const handleCall = useCallback((number: string) => {
    window.location.href = `tel:${number}`;
  }, []);

  const handleShareLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationMsg(sosUI.locationError[locale]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `Emergency! My location: https://maps.google.com/?q=${latitude},${longitude}`;

        if (navigator.share) {
          try {
            await navigator.share({ title: "SOS Location", text: locationText });
            setLocationMsg(sosUI.locationShared[locale]);
          } catch {
            // User cancelled share, try clipboard fallback
            try {
              await navigator.clipboard.writeText(locationText);
              setLocationMsg(sosUI.locationShared[locale]);
            } catch {
              setLocationMsg(sosUI.locationError[locale]);
            }
          }
        } else {
          try {
            await navigator.clipboard.writeText(locationText);
            setLocationMsg(sosUI.locationShared[locale]);
          } catch {
            setLocationMsg(sosUI.locationError[locale]);
          }
        }
      },
      () => {
        setLocationMsg(sosUI.locationError[locale]);
      }
    );
  }, [locale]);

  const contacts: EmergencyContact[] = [
    {
      key: "police",
      number: "112",
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "#3B82F6",
    },
    {
      key: "ambulance",
      number: "108",
      icon: <Heart className="w-5 h-5" />,
      color: "#EF4444",
    },
    {
      key: "fire",
      number: "101",
      icon: <Flame className="w-5 h-5" />,
      color: "#F59E0B",
    },
    {
      key: "womenHelpline",
      number: "1091",
      icon: <Phone className="w-5 h-5" />,
      color: "#A855F7",
    },
    {
      key: "kumbhControl",
      number: "0253-2305555",
      icon: <Siren className="w-5 h-5" />,
      color: "#D4A843",
    },
    {
      key: "disasterMgmt",
      number: "0253-2571202",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "#EAB308",
    },
  ];

  if (!show) return null;

  return (
    <>
      {/* SOS Trigger Button */}
      <button
        onClick={toggle}
        aria-label="SOS Emergency"
        className="sos-pulse fixed top-20 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-bold text-xs uppercase shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #DC2626, #EF4444)",
          boxShadow: "0 4px 20px rgba(220, 38, 38, 0.5)",
        }}
      >
        <ShieldAlert className="w-4 h-4" />
        SOS
      </button>

      {/* Emergency Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[59] transition-opacity duration-300"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={closePanel}
          />

          {/* Panel */}
          <div
            className="fixed z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(26, 21, 16, 0.98)",
              border: "1px solid rgba(220, 38, 38, 0.3)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              /* Centered on desktop, bottom sheet on mobile */
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "1rem",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-3">
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "#EF4444" }}
                >
                  {sosUI.title[locale]}
                </h3>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {sosUI.subtitle[locale]}
                </p>
              </div>
              <button
                onClick={closePanel}
                aria-label="Close"
                className="p-1 rounded-lg transition-colors duration-200 hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" style={{ color: "rgba(255, 255, 255, 0.5)" }} />
              </button>
            </div>

            {/* Red Divider */}
            <div
              className="mx-5 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #DC2626, transparent)" }}
            />

            {/* Emergency Contacts Grid */}
            <div className="grid grid-cols-2 gap-2.5 px-5 py-4">
              {contacts.map((contact) => (
                <button
                  key={contact.key}
                  onClick={() => handleCall(contact.number)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${contact.color}20`,
                      color: contact.color,
                    }}
                  >
                    {contact.icon}
                  </div>
                  <span
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {sosUI[contact.key][locale]}
                  </span>
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: "rgba(255, 255, 255, 0.45)" }}
                  >
                    {contact.number}
                  </span>
                </button>
              ))}
            </div>

            {/* Share My Location Button */}
            <div className="px-5 pb-3">
              <button
                onClick={handleShareLocation}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #D4A843, #B8922E)",
                  color: "#0D0906",
                  boxShadow: "0 4px 15px rgba(212, 168, 67, 0.3)",
                }}
              >
                <MapPin className="w-4 h-4" />
                {sosUI.shareLocation[locale]}
              </button>

              {/* Location Status Message */}
              {locationMsg && (
                <p
                  className="text-xs text-center mt-2 transition-opacity duration-300"
                  style={{
                    color: locationMsg === sosUI.locationShared[locale]
                      ? "#4ADE80"
                      : "#EF4444",
                  }}
                >
                  {locationMsg}
                </p>
              )}
            </div>

            {/* Help Text */}
            <div
              className="px-5 pb-5 pt-1"
            >
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.4)" }}
              >
                {sosUI.helpText[locale]}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
