import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from '../ui/Toast';
import { CartDrawer } from '../cart/CartDrawer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <CartDrawer />
    </div>
  );
};

