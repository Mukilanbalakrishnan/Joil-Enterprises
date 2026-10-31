import React, { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import type { Category } from '../../types';
import { slugify } from '../../utils/helpers';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setTagline('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setTagline(cat.tagline || '');
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const defaultImg =
      image.trim() ||
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80';

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: name.trim(),
        slug: slugify(name),
        tagline: tagline.trim(),
        description: description.trim(),
        image: defaultImg,
      });
    } else {
      addCategory({
        name: name.trim(),
        slug: slugify(name),
        tagline: tagline.trim() || 'Engineered commercial assemblies and hardware',
        description: description.trim() || 'Technical architectural line with certified metallurgy.',
        image: defaultImg,
        featured: false,
      });
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Category Management
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Organize catalogue series, descriptive taglines, and public category showcase banners.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Category
        </Button>
      </div>

      {/* Categories Grid/Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xs hover:border-neutral-400 transition-colors"
            >
              <div>
                <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-2xs">
                    {productCount} {productCount === 1 ? 'Product' : 'Products'}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                    slug: /{cat.slug}
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 leading-snug">{cat.name}</h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {cat.tagline || cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-neutral-100 bg-[#FAF9F7] flex items-center justify-between text-xs">
                <a
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 font-medium inline-flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  Storefront <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="p-1.5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        description="Configure category display properties for the public catalogue."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Structural Stainless Fasteners"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Certified high-tensile structural hardware"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Technical line overview..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Banner Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCategory ? 'Update Category' : 'Save Category'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        title="Confirm Category Deletion"
        description="Are you sure you want to remove this category? Products assigned to it will remain in inventory."
        confirmLabel="Delete Category"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
      >
        {categoryToDelete && (
          <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 space-y-1">
            <div className="font-semibold text-neutral-900">{categoryToDelete.name}</div>
            <div className="text-xs text-neutral-500">Slug: /{categoryToDelete.slug}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};
