import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'success' | 'outline' | 'surface';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const base = 'inline-flex items-center font-medium tracking-wide uppercase transition-colors';

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-sm',
    md: 'text-xs px-3 py-1 rounded-sm',
  };

  const variants = {
    neutral: 'bg-neutral-100 text-neutral-800 border border-neutral-200/60',
    accent: 'bg-[#F9F4EE] text-[#7A4B1E] border border-[#E9D9C8]',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    outline: 'bg-transparent text-neutral-600 border border-neutral-300',
    surface: 'bg-white text-neutral-700 border border-neutral-200 shadow-2xs',
  };

  return <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>{children}</span>;
};

