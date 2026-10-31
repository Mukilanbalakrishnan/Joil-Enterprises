import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Clock, Package, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-[#FAF5EE] border-t border-neutral-200/90 text-neutral-800 pt-16 pb-12 relative overflow-hidden">
      {/* Background subtle ambient glows */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-200/80">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <button
              onClick={() => scrollTo('hero')}
              className="inline-block text-left group focus:outline-hidden cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-black tracking-wider text-xl text-neutral-950 uppercase font-['Outfit']">
                      Joli
                    </span>
                    <span className="font-extrabold tracking-wider text-sm text-amber-600 uppercase font-['Outfit']">
                      Enterprises
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-bold mt-1">
                    Direct China Wholesale Importers
                  </span>
                </div>
              </div>
            </button>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              {COMPANY_INFO.summary}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs text-neutral-700 shadow-2xs font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Yiwu & Ningbo Factory Direct • Daily Chennai Godown Dispatch</span>
            </div>
          </div>

          {/* SPA Section Jumps (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-900 font-['Outfit']">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-neutral-600 font-medium">
              {[
                { label: 'Hero Overview', id: 'hero' },
                { label: 'Bulk Lot Deals', id: 'offers' },
                { label: 'Import Logistics', id: 'about' },
                { label: 'Sourcing Director', id: 'founder' },
                { label: 'Product Categories', id: 'categories' },
                { label: 'B2B Catalogue', id: 'products' },
                { label: 'Godown Videos', id: 'videos' },
                { label: 'Retailer Reviews', id: 'testimonials' },
                { label: 'Wholesale Inquiry', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="hover:text-amber-700 hover:translate-x-0.5 transition-all cursor-pointer text-left py-0.5 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Central Godown Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-900 font-['Outfit']">
              Chennai Godown & Dispatch
            </h4>
            <ul className="space-y-3 text-xs text-neutral-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium text-neutral-700">
                  {COMPANY_INFO.contact.address}, {COMPANY_INFO.contact.city},{' '}
                  {COMPANY_INFO.contact.state} {COMPANY_INFO.contact.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.salesEmail}`}
                  className="hover:text-amber-700 transition-colors font-medium text-neutral-700"
                >
                  {COMPANY_INFO.contact.salesEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contact.directLine}`}
                  className="hover:text-emerald-700 transition-colors font-bold text-neutral-900"
                >
                  {COMPANY_INFO.contact.directLine} (WhatsApp Fast Orders)
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-500 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contact.workingHours}</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/admin/login"
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-neutral-900 inline-flex items-center gap-1 font-bold transition-colors"
              >
                Wholesale Portal Admin <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Developer Credit & Tagline Branding */}
        <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="space-y-1.5">
            <p className="font-extrabold text-neutral-900 font-['Outfit'] text-sm">
              © {CURRENT_YEAR} {COMPANY_INFO.legalName}. All rights reserved.
            </p>
            <p className="text-[11px] text-neutral-500 max-w-xl">
              B2B wholesale importing platform. Direct container imports from Yiwu, Ningbo and Shenzhen distributed to retail shopkeepers across India.
            </p>
          </div>

          {/* Premium Developer Attribution Card */}
          <div className="bg-white border border-neutral-200/90 rounded-3xl p-4 sm:px-6 sm:py-3.5 space-y-1 text-left sm:text-right shrink-0 shadow-xs hover:shadow-md transition-shadow">
            <div className="text-[11px] font-extrabold tracking-wider uppercase text-neutral-900 flex items-center gap-1.5 justify-start sm:justify-end">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Developed by {COMPANY_INFO.developer.name}</span>
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-amber-700 font-black">
              {COMPANY_INFO.developer.tagline}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
