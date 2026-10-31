import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Image, Save } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { Button } from '../../components/ui/Button';
import type { Specification } from '../../types';

const AdminProductFormContent: React.FC<{ id?: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { categories, addProduct, updateProduct, getProductById } = useStore();

  const isEditMode = Boolean(id);
  const existingProduct = id ? getProductById(id) : undefined;

  // Form State initialized directly from existing product if available
  const [name, setName] = useState(existingProduct?.name || '');
  const [sku, setSku] = useState(existingProduct?.sku || '');
  const [category, setCategory] = useState(
    existingProduct?.category || categories[0]?.name || 'Architectural Hardware'
  );
  const [subcategory, setSubcategory] = useState(existingProduct?.subcategory || '');
  const [shortDescription, setShortDescription] = useState(existingProduct?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(existingProduct?.fullDescription || '');
  const [imageUrl, setImageUrl] = useState(existingProduct?.images?.[0] || '');
  const [status, setStatus] = useState<'published' | 'draft'>(existingProduct?.status || 'published');
  const [isFeatured, setIsFeatured] = useState(Boolean(existingProduct?.isFeatured));
  const [leadTime, setLeadTime] = useState(existingProduct?.leadTime || '3-5 business days');
  const [minOrderQuantity, setMinOrderQuantity] = useState(existingProduct?.minOrderQuantity || '1 Unit');
  const [specifications, setSpecifications] = useState<Specification[]>(() => {
    if (existingProduct?.specifications && existingProduct.specifications.length > 0) {
      return existingProduct.specifications;
    }
    return [
      { label: 'Material', value: 'AISI 316 Stainless Steel' },
      { label: 'Finish', value: 'Satin Brush' },
    ];
  });

  const handleAddSpec = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Product Name is required.');
      return;
    }

    const defaultImg =
      imageUrl.trim() ||
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80';

    const validSpecs = specifications.filter((s) => s.label.trim() && s.value.trim());

    if (isEditMode && id) {
      updateProduct(id, {
        name: name.trim(),
        sku: sku.trim(),
        category,
        subcategory: subcategory.trim() || undefined,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        images: [defaultImg],
        specifications: validSpecs,
        status,
        isFeatured,
        leadTime,
        minOrderQuantity,
      });
    } else {
      addProduct({
        name: name.trim(),
        sku: sku.trim() || `JE-${Math.floor(100 + Math.random() * 900)}`,
        category,
        subcategory: subcategory.trim() || undefined,
        shortDescription: shortDescription.trim() || 'Precision architectural hardware specification.',
        fullDescription: fullDescription.trim() || 'Engineered specification suitable for commercial projects.',
        images: [defaultImg],
        specifications: validSpecs,
        status,
        isFeatured,
        leadTime,
        minOrderQuantity,
      });
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Products
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
            {isEditMode ? 'Edit Specification' : 'New Product Specification'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Product Information Card */}
        <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-100">
            Core Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Linear Profile Pivot System 400"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SKU */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                SKU / Reference Identifier
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. JE-ARC-401"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm font-mono text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
            </div>

            {/* Subcategory */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Subcategory / Series
              </label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g. Door Hardware"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
            </div>

            {/* Status (Published / Draft) */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Publishing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              >
                <option value="published">Published (Visible on storefront)</option>
                <option value="draft">Draft (Internal preview only)</option>
              </select>
            </div>

            {/* Lead Time */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Standard Lead Time
              </label>
              <input
                type="text"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                placeholder="e.g. 3-5 business days"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
            </div>

            {/* Min Order Quantity */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Minimum Order Quantity
              </label>
              <input
                type="text"
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(e.target.value)}
                placeholder="e.g. 1 Unit / 10 Pcs"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Short Summary Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="High-level commercial summary for catalogue cards..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Detailed Engineering Description
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Comprehensive architectural specifications, installation guidelines, tolerances, and metallurgy notes..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded-xs border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs uppercase tracking-wider font-medium text-neutral-800 cursor-pointer">
              Highlight as Featured Product on Homepage
            </label>
          </div>
        </div>

        {/* Product Imagery */}
        <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-100">
            Product Photography
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                Image Source URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
              />
              <p className="text-[11px] text-neutral-400">
                Paste any high-resolution image URL. If blank, standard catalogue placeholder applies.
              </p>
            </div>

            <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 border border-neutral-200 rounded-xs bg-[#FAF9F7] aspect-[4/3] overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xs"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-center text-neutral-400 text-xs flex flex-col items-center gap-1">
                  <Image className="w-6 h-6 stroke-[1.5]" />
                  <span>No image preview</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specifications Editor */}
        <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Technical Specifications
            </h2>
            <button
              type="button"
              onClick={handleAddSpec}
              className="text-xs uppercase tracking-wider font-medium text-[#8F5D2C] hover:text-[#6E421B] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Attribute
            </button>
          </div>

          <div className="space-y-3">
            {specifications.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Attribute (e.g. Material)"
                  value={spec.label}
                  onChange={(e) => handleUpdateSpec(idx, 'label', e.target.value)}
                  className="w-1/3 px-3 py-2 bg-[#FAF9F7] border border-neutral-200 rounded-xs text-xs text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Specification Value (e.g. AISI 316)"
                  value={spec.value}
                  onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                  className="w-2/3 px-3 py-2 bg-white border border-neutral-200 rounded-xs text-xs text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="p-2 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove attribute"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
          <Link to="/admin/products">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="md"
            rightIcon={<Save className="w-4 h-4" />}
          >
            {isEditMode ? 'Update Specification' : 'Create Product Specification'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <AdminProductFormContent key={id || 'new'} id={id} />;
};
