import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AdminDashboardPage: React.FC = () => {
  const { products, categories, resetToDefaults } = useStore();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const draftProducts = products.filter((p) => p.status === 'draft').length;
  const totalCategories = categories.length;

  // Recent 5 products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8F5D2C]">
            Catalogue Administration
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitor product inventory, category distribution, and publishing status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Product
            </Button>
          </Link>
          <Link to="/admin/categories">
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs uppercase tracking-wider font-semibold">
            <span>Total Catalogue</span>
            <Package className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-900">{totalProducts}</div>
          <div className="text-[11px] text-neutral-500">Registered inventory specifications</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs uppercase tracking-wider font-semibold">
            <span>Active Categories</span>
            <Layers className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-900">{totalCategories}</div>
          <div className="text-[11px] text-neutral-500">Commercial product lines</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs uppercase tracking-wider font-semibold">
            <span>Live Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-900">{publishedProducts}</div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Visible on public storefront
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs uppercase tracking-wider font-semibold">
            <span>Draft Items</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-900">{draftProducts}</div>
          <div className="text-[11px] text-neutral-500">Unpublished specifications</div>
        </div>
      </div>

      {/* Grid: Recent Products (8 cols) + Quick Tasks (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Products Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-sm overflow-hidden">
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Recent Product Activity
            </h2>
            <Link
              to="/admin/products"
              className="text-xs text-[#8F5D2C] hover:text-[#6E421B] font-medium flex items-center gap-1"
            >
              View Full Table <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 text-xs">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 flex items-center justify-between hover:bg-neutral-50/70 transition-colors gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded-xs border border-neutral-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-neutral-900 truncate">{p.name}</h4>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {p.category} {p.sku ? `• ${p.sku}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={p.status === 'published' ? 'success' : 'outline'} size="sm">
                    {p.status}
                  </Badge>
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="text-neutral-700 hover:text-neutral-950 font-medium underline underline-offset-2"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 pb-2 border-b border-neutral-100">
              Quick Operations
            </h3>

            <div className="space-y-2">
              <Link to="/admin/products/new" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Plus className="w-3.5 h-3.5 mr-2" /> Add New Product Specification
                </Button>
              </Link>

              <Link to="/admin/categories" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Plus className="w-3.5 h-3.5 mr-2" /> Manage Categories
                </Button>
              </Link>

              <Link to="/products" target="_blank" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" /> View Public Storefront
                </Button>
              </Link>

              <button onClick={resetToDefaults} className="w-full block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-neutral-500 hover:text-neutral-800"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset Local State to Mock Defaults
                </Button>
              </button>
            </div>
          </div>

          {/* Category Distribution Summary */}
          <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 pb-2 border-b border-neutral-100">
              Distribution by Category
            </h3>
            <div className="space-y-2 text-xs">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;
                return (
                  <div key={c.id} className="flex items-center justify-between py-1 text-neutral-600">
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="font-semibold text-neutral-900 px-2 py-0.5 bg-neutral-100 rounded-2xs">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
