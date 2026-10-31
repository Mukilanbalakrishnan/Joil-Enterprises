import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Navigation,
  Sparkles,
  Truck,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { useStore } from '../../context/useStore';

interface ContactSectionProps {
  prefilledProduct?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledProduct = '' }) => {
  const { showToast } = useStore();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fullAddress = `${COMPANY_INFO.contact.address}, ${COMPANY_INFO.contact.city}, ${COMPANY_INFO.contact.state} ${COMPANY_INFO.contact.postalCode}, ${COMPANY_INFO.contact.country}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Wholesale Trade Hub Godown Complex Sector 7 Outer Ring Logistics Park Chennai Tamil Nadu 600001'
  )}`;

  const mapEmbedUrl = `https://maps.google.com/maps?q=Outer+Ring+Road+Logistics+Park,+Chennai,+Tamil+Nadu+600001&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const whatsappMessage = prefilledProduct
    ? `Hi Joli Enterprises, I am inquiring about wholesale master cartons of ${prefilledProduct}. Please share carton pricing and dispatch availability.`
    : `Hi Joli Enterprises, I am a retailer looking for wholesale prices on direct China import items. Please share your current product catalogue and carton price list.`;

  const whatsappLink = `https://wa.me/919840123456?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyAddress = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      showToast('Godown address copied to clipboard!', 'success');
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-6 sm:py-8 lg:py-10 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5EE] border border-amber-300/80 text-[11px] font-black uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Direct Wholesale Godown</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-tight">
              Get in Touch with <span className="text-amber-600">Our Godown Desk</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-normal leading-relaxed md:text-right">
            Visit our Chennai central godown for master carton inspections, pickup, or same-day road transport dispatch across India.
          </p>
        </div>

        {/* 2-Column Single Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* ================= LEFT SIDE: CONTACT DETAILS (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {/* 1. Phone Number & WhatsApp Card */}
            <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 hover:border-amber-400 hover:shadow-xs transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 font-['Outfit']">
                      Phone & WhatsApp
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200/60">
                      Instant Reply
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <a
                      href="tel:+919840123456"
                      className="text-sm sm:text-base font-black text-neutral-950 font-['Outfit'] hover:text-amber-600 transition-colors"
                    >
                      {COMPANY_INFO.contact.directLine}
                    </a>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      / {COMPANY_INFO.contact.phone}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-tight mt-0.5">
                    Carton rates, live video inspections & lorry receipt sharing.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919840123456"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-neutral-900 hover:text-white border border-neutral-200 text-neutral-800 text-[11px] font-bold transition-all shadow-2xs"
                    >
                      <Phone className="w-2.5 h-2.5 text-neutral-500" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Mail ID Card */}
            <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 hover:border-amber-400 hover:shadow-xs transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 font-['Outfit']">
                      Wholesale Email
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200/60">
                      B2B Sourcing
                    </span>
                  </div>
                  <div className="mt-0.5">
                    <a
                      href={`mailto:${COMPANY_INFO.contact.salesEmail}`}
                      className="text-xs sm:text-sm font-black text-neutral-950 font-['Outfit'] hover:text-amber-600 transition-colors block leading-tight"
                    >
                      {COMPANY_INFO.contact.salesEmail}
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.contact.email}`}
                      className="text-[11px] text-neutral-500 hover:text-neutral-800 transition-colors block"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                  <div className="pt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.contact.salesEmail}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-neutral-900 hover:text-white border border-neutral-200 text-neutral-800 text-[11px] font-bold transition-all shadow-2xs"
                    >
                      <Mail className="w-2.5 h-2.5 text-neutral-500" />
                      <span>Compose Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Godown & Office Address Card */}
            <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-2xl p-3.5 sm:p-4 hover:border-amber-400 hover:shadow-xs transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 border border-rose-500/20 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 font-['Outfit'] block">
                    Central Godown & Office
                  </span>
                  <p className="text-xs sm:text-[13px] font-bold text-neutral-950 font-['Outfit'] leading-snug mt-0.5">
                    {COMPANY_INFO.contact.address}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.state} {COMPANY_INFO.contact.postalCode}
                  </p>
                  <div className="pt-0.5 flex items-center gap-1 text-[10px] text-neutral-500">
                    <Clock className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                    <span>Mon – Sat: 09:30 AM – 07:30 PM</span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <Navigation className="w-2.5 h-2.5" />
                      <span>Directions</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5 text-neutral-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Transport Logistics Pill */}
            <div className="bg-white border border-neutral-200/80 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs">
              <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-[11px] text-neutral-600 truncate">
                Daily road dispatch via <strong className="text-neutral-900">VRL, ARC, KPN, ABT & Navata</strong>
              </span>
            </div>
          </div>

          {/* ================= RIGHT SIDE: COMPACT MAP SECTION (7 cols) ================= */}
          <div className="lg:col-span-7 h-[360px] sm:h-[400px] lg:h-auto min-h-[350px] rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs relative bg-neutral-100 flex flex-col group">
            {/* Interactive Google Map iframe */}
            <iframe
              title="Joli Enterprises Chennai Central Godown Location"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top Floating Mini Card */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-xl p-2.5 shadow-md space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center font-black text-[11px] font-['Outfit']">
                    JE
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-950 font-['Outfit'] leading-tight">
                      Joli Enterprises Godown
                    </h4>
                    <span className="text-[10px] text-neutral-500 block">
                      Sector 7, Logistics Park, Chennai
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open
                </span>
              </div>
            </div>

            {/* Bottom Floating Navigation Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-xl px-3 py-2 shadow-md">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-[11px] font-bold text-neutral-900 font-['Outfit'] truncate">
                  Chennai Logistics Dock
                </span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
