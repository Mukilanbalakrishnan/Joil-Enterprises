import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ExternalLink,
  LogOut,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Toast } from '../ui/Toast';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout, resetToDefaults } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Product Inventory', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col md:flex-row text-neutral-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0">
        {/* Brand / Admin Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-[0.2em] text-neutral-900 text-sm uppercase">
                Joli
              </span>
              <span className="font-light tracking-[0.2em] text-neutral-500 text-xs uppercase">
                Admin
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase text-[#8F5D2C] font-semibold mt-0.5">
              Catalogue Management
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-50 text-amber-800 border border-amber-200">
            <ShieldCheck className="w-3 h-3" /> Demo
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-grow" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 pb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            External Links
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-sm text-xs tracking-wider uppercase text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
              Public Storefront
            </span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 space-y-3">
          <div className="px-2 py-1.5 bg-neutral-50 rounded-sm border border-neutral-150">
            <div className="text-[11px] font-semibold text-neutral-800 truncate">
              {currentUser.name || 'Demo Administrator'}
            </div>
            <div className="text-[10px] text-neutral-500 truncate">
              {currentUser.email || 'admin@joli.com'}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={resetToDefaults}
              className="text-[11px] text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset mock data to initial demo state"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Data
            </button>

            <button
              onClick={handleLogout}
              className="text-[11px] text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-neutral-900 tracking-wide">
              Management Portal
            </h1>
            <span className="text-xs text-neutral-400">|</span>
            <span className="text-xs text-neutral-500">Local State Architecture</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="text-xs tracking-wider uppercase text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              Live Catalogue <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-grow">
          <Outlet />
        </div>
      </main>

      <Toast />
    </div>
  );
};

