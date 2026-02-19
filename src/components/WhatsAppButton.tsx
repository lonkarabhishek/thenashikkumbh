"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const message = encodeURIComponent(
    "Namaste 🙏 I would like to know more about Nashik Kumbh Mela 2027. Please share details about dates, rituals, and accommodations."
  );
  const whatsappUrl = `https://wa.me/?text=${message}`;

  if (!show) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp about Nashik Kumbh Mela"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 25px rgba(37,211,102,0.4)",
        }}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#25D366" }} />
        <MessageCircle className="w-6 h-6 text-white relative z-10" />
      </div>
    </a>
  );
}
