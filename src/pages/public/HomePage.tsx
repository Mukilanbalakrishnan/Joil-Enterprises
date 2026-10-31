import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../../components/sections/HeroSection';
import { ComboOffersSection } from '../../components/sections/ComboOffersSection';
import { AboutCompanySection } from '../../components/sections/AboutCompanySection';
import { AboutFounderSection } from '../../components/sections/AboutFounderSection';
import { CategorySection } from '../../components/sections/CategorySection';
import { ProductSection } from '../../components/sections/ProductSection';
import { VideosSection } from '../../components/sections/VideosSection';
import { TestimonialSection } from '../../components/sections/TestimonialSection';
import { ContactSection } from '../../components/sections/ContactSection';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [prefilledProduct, setPrefilledProduct] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    scrollToSection('products');
  };

  const handleEnquireClick = (productName?: string) => {
    if (productName) {
      setPrefilledProduct(productName);
    }
    scrollToSection('contact');
  };

  const handleCategorySelect = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const handleOfferSelect = (offerTitle: string) => {
    setPrefilledProduct(offerTitle);
    scrollToSection('contact');
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <HeroSection
        onExploreClick={handleExploreClick}
        onEnquireClick={handleEnquireClick}
      />

      {/* 2. COMBO OFFERS SECTION */}
      <ComboOffersSection
        onSelectOffer={handleOfferSelect}
      />

      {/* 3. ABOUT COMPANY SECTION */}
      <AboutCompanySection />

      {/* 4. ABOUT FOUNDER SECTION */}
      <AboutFounderSection />

      {/* 5. CATEGORY SECTION */}
      <CategorySection
        onCategorySelect={handleCategorySelect}
      />

      {/* 6. PRODUCT CATALOGUE SECTION */}
      <ProductSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onEnquireClick={handleEnquireClick}
      />

      {/* 8. VIDEOS SECTION */}
      <VideosSection />

      {/* 9. TESTIMONIAL SECTION */}
      <TestimonialSection />

      {/* 10. CONTACT SECTION */}
      <ContactSection
        prefilledProduct={prefilledProduct}
      />
    </div>
  );
};
