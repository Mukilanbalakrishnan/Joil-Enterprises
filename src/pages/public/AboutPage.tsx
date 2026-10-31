import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, Layers } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { COMPANY_INFO } from '../../data/companyData';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Top Banner / Breadcrumb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'About Us' }]} className="mb-6" />

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-sm border border-neutral-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F5D2C]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
              Corporate Overview
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
            Engineering precision and material integrity for architectural standards.
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed pt-2 max-w-3xl">
            At Joli Enterprises, we specialize in the distribution and supply of high-grade
            architectural hardware, precision-engineered metal fittings, and technical surface
            linings tailored for commercial specifiers, construction developers, and interior
            architects.
          </p>
        </div>
      </section>

      {/* Editorial Dual-Image & Philosophy Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual */}
          <div className="lg:col-span-7 bg-[#F4F4F1] border border-neutral-200 rounded-sm overflow-hidden aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
              alt="High-precision architectural fabrication and metal testing"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF9F7] border border-neutral-200/80 rounded-sm p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5D2C]">
                Commercial Approach
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
                Specification-First Methodology
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Rather than treating architectural fixtures as generic commoditized parts, our
                operational philosophy centres on exact technical fit, certified tensile
                performance, and repeatable finishes.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every component represented in our catalogue is vetted for compatibility with
                modern structural codes, international mechanical fasteners, and seamless aesthetic
                integration.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500">
              <div className="font-semibold text-neutral-800 uppercase tracking-wider mb-1">
                Representative Catalogue Framework
              </div>
              <p>
                Product specifications shown in this deployment are configured for commercial
                evaluation and can be adapted directly via our administrative module.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-white border-y border-neutral-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5D2C]">
              Operational Pillars
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-neutral-200 rounded-sm p-6 space-y-3 bg-[#FCFCFB]">
              <div className="w-10 h-10 rounded-sm bg-neutral-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#E6A15C]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Traceable Metallurgy</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ensuring material integrity across every batch: marine-grade AISI 316 stainless,
                aerospace 7075-T6 aluminum alloys, and forged brass formulations.
              </p>
            </div>

            <div className="border border-neutral-200 rounded-sm p-6 space-y-3 bg-[#FCFCFB]">
              <div className="w-10 h-10 rounded-sm bg-neutral-900 text-white flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#E6A15C]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Technical Submittals</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Empowering architectural specifiers and project engineers with CAD-ready dimensional
                drawings, physical tolerances, and certified testing schedules.
              </p>
            </div>

            <div className="border border-neutral-200 rounded-sm p-6 space-y-3 bg-[#FCFCFB]">
              <div className="w-10 h-10 rounded-sm bg-neutral-900 text-white flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#E6A15C]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Contractor Fulfillment</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Flexible order staging matched to commercial construction phasing, with dedicated
                single-point-of-contact procurement management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Context & Brand Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-sm p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5D2C]">
              Digital System Architecture
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-950">
              Developed by {COMPANY_INFO.developer.name}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Designed and built with modern frontend engineering standards, accessible interface
              hierarchies, and an editorial product catalogue tailored for corporate specifiers.
            </p>
            <div className="text-xs tracking-[0.18em] uppercase font-semibold text-[#8F5D2C]">
              {COMPANY_INFO.developer.tagline}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/products">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Catalogue
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="md">
                Direct Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
