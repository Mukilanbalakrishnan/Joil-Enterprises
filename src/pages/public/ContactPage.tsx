import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { COMPANY_INFO } from '../../data/companyData';
import { validateEmail, validatePhone } from '../../utils/helpers';
import { useStore } from '../../context/StoreContext';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  productInterest?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';
  const { showToast } = useStore();

  const [form, setForm] = useState<FormState>(() => ({
    fullName: '',
    email: '',
    phone: '',
    productInterest: prefilledProduct,
    message: prefilledProduct
      ? `We are requesting a formal quotation and technical submittal for ${prefilledProduct}.`
      : '',
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please provide a valid commercial email address.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = 'Please provide a valid phone format with country/area code.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please provide your enquiry details or project scope.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission in frontend demonstration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Enquiry received in frontend demonstration mode.');
    }, 800);
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      productInterest: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Contact Us & Enquiries' }]} />

      {/* Header */}
      <div className="border-b border-neutral-200/80 pb-8 space-y-3">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5D2C]">
          Commercial Consultation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Project Enquiries & Quotations
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl">
          Get in touch with our commercial desk for technical submittals, enterprise pricing, custom
          dimensional requirements, or project staging.
        </p>
      </div>

      {/* Main Grid: Form (7 cols) + Direct Information (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Section (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF9F7] border border-neutral-200/90 rounded-sm p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900">
                  Enquiry Received (Demonstration)
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-neutral-900">{form.fullName}</span>.
                  Your request regarding{' '}
                  <span className="font-semibold text-neutral-900">
                    {form.productInterest || 'commercial specifications'}
                  </span>{' '}
                  has been formatted and processed.
                </p>
              </div>

              <div className="p-4 bg-white border border-neutral-200 rounded-xs text-xs text-neutral-500 max-w-md mx-auto text-left space-y-1">
                <div><strong>Submission Mode:</strong> Frontend Local State</div>
                <div><strong>Registered Contact:</strong> {form.email} • {form.phone}</div>
                <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-100 mt-2">
                  * In production, this form securely routes via encrypted SMTP / webhook to the procurement desk.
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Button variant="secondary" size="md" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
                <Link to="/products">
                  <Button variant="primary" size="md">
                    Return to Catalogue
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h2 className="text-base font-semibold text-neutral-900">
                  Direct Enquiry Form
                </h2>
                <span className="text-[11px] text-neutral-400">
                  * Indicates required field
                </span>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-800"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-colors ${
                    errors.fullName
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider font-semibold text-neutral-800"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-colors ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider font-semibold text-neutral-800"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98400 00000"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-colors ${
                      errors.phone
                        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject / Product of Interest */}
              <div className="space-y-1.5">
                <label
                  htmlFor="productInterest"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-800"
                >
                  Product Line / Subject of Interest
                </label>
                <input
                  id="productInterest"
                  name="productInterest"
                  type="text"
                  placeholder="e.g. Linear Profile Pivot System 400 or General Catalogue"
                  value={form.productInterest}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider font-semibold text-neutral-800"
                >
                  Project Details / Quantity Requirements *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please specify estimated volumes, project location, alloy specifications, and anticipated delivery schedule..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-colors ${
                    errors.message
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Submit Project Enquiry
                </Button>
              </div>

              <p className="text-[11px] text-neutral-400 pt-1">
                Notice: Frontend prototype demonstration. Submissions are processed locally and
                validated without persistent server transmission.
              </p>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Company Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white border border-neutral-200/90 rounded-sm p-6 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 pb-3 border-b border-neutral-100">
              Commercial Desk
            </h3>

            <div className="space-y-4 text-sm text-neutral-700">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF9F7] text-neutral-700 border border-neutral-200/70">
                  <MapPin className="w-4 h-4 text-[#8F5D2C]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
                    Commercial Office
                  </div>
                  <div className="text-neutral-900 font-medium mt-0.5">
                    {COMPANY_INFO.contact.address}
                  </div>
                  <div className="text-neutral-500 text-xs">
                    {COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.state} {COMPANY_INFO.contact.postalCode}, {COMPANY_INFO.contact.country}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF9F7] text-neutral-700 border border-neutral-200/70">
                  <Mail className="w-4 h-4 text-[#8F5D2C]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-neutral-900 font-medium mt-0.5">
                    <a href={`mailto:${COMPANY_INFO.contact.salesEmail}`} className="hover:underline">
                      {COMPANY_INFO.contact.salesEmail}
                    </a>
                  </div>
                  <div className="text-neutral-500 text-xs">
                    General: {COMPANY_INFO.contact.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF9F7] text-neutral-700 border border-neutral-200/70">
                  <Phone className="w-4 h-4 text-[#8F5D2C]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
                    Telephone
                  </div>
                  <div className="text-neutral-900 font-medium mt-0.5">
                    {COMPANY_INFO.contact.phone}
                  </div>
                  <div className="text-neutral-500 text-xs">
                    Direct Line: {COMPANY_INFO.contact.directLine}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF9F7] text-neutral-700 border border-neutral-200/70">
                  <Clock className="w-4 h-4 text-[#8F5D2C]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
                    Operating Schedule
                  </div>
                  <div className="text-neutral-900 font-medium mt-0.5 text-xs">
                    {COMPANY_INFO.contact.workingHours}
                  </div>
                  <div className="text-[#8F5D2C] text-xs font-medium mt-0.5">
                    {COMPANY_INFO.contact.responseCommitment}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Card */}
          <div className="bg-[#FAF9F6] border border-neutral-200 rounded-sm p-6 space-y-2">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8F5D2C]">
              Engineered by
            </div>
            <h4 className="text-sm font-bold text-neutral-900">
              {COMPANY_INFO.developer.name}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {COMPANY_INFO.developer.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
