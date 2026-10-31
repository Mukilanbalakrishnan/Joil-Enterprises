import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import type { Product } from '../../types';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, deleteProduct, updateProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'published' | 'draft'>('All');

  // Deletion confirmation modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedCategory, selectedStatus, searchQuery]);

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleToggleStatus = (p: Product) => {
    const nextStatus = p.status === 'published' ? 'draft' : 'published';
    updateProduct(p.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Product Inventory
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage commercial hardware specifications, imagery, status, and metadata.
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-[#FBFBFA] border border-neutral-200 rounded-xs text-xs text-neutral-900 focus:outline-hidden focus:border-neutral-900"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-neutral-200 rounded-xs text-xs px-3 py-2 text-neutral-800 focus:outline-hidden focus:border-neutral-900"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as any)}
          className="bg-white border border-neutral-200 rounded-xs text-xs px-3 py-2 text-neutral-800 focus:outline-hidden focus:border-neutral-900"
        >
          <option value="All">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-neutral-200">
            <thead className="bg-[#FAF9F7] text-neutral-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th scope="col" className="px-4 py-3.5">
                  Item
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Category & SKU
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Lead Time
                </th>
                <th scope="col" className="px-4 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No products match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Item Image & Title */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-xs border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link
                            to={`/admin/products/${prod.id}/edit`}
                            className="font-semibold text-neutral-900 hover:text-[#8F5D2C] truncate block"
                          >
                            {prod.name}
                          </Link>
                          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {prod.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & SKU */}
                    <td className="px-4 py-3 text-neutral-600">
                      <div className="font-medium text-neutral-900">{prod.category}</div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        {prod.sku || '—'}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(prod)}
                        className="cursor-pointer"
                        title="Click to toggle publish status"
                      >
                        <Badge
                          variant={prod.status === 'published' ? 'success' : 'outline'}
                          size="sm"
                        >
                          {prod.status}
                        </Badge>
                      </button>
                    </td>

                    {/* Lead time */}
                    <td className="px-4 py-3 text-neutral-600">
                      {prod.leadTime || '3-5 days'}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/products/${prod.id}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
                        title="Preview Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/admin/products/${prod.id}/edit`}
                        className="inline-flex p-1.5 text-neutral-700 hover:text-neutral-950 rounded transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => setProductToDelete(prod)}
                        className="inline-flex p-1.5 text-red-500 hover:text-red-700 rounded transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-[#FAF9F7] border-t border-neutral-100 text-[11px] text-neutral-500 flex justify-between items-center">
          <span>Total Displayed: {filteredProducts.length} specifications</span>
          <span>Click status pill to toggle publish state</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Confirm Specification Deletion"
        description="Are you sure you want to remove this product from the local catalogue? This action updates local mock state."
        confirmLabel="Delete Product"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
      >
        {productToDelete && (
          <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 space-y-1">
            <div className="font-semibold text-neutral-900">{productToDelete.name}</div>
            <div className="text-xs text-neutral-500">
              {productToDelete.category} • SKU: {productToDelete.sku}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
