import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none';

  const sizeStyles = {
    sm: 'text-xs tracking-wider uppercase px-3.5 py-1.5 gap-1.5 rounded-sm',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-sm',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-sm',
  };

  const variantStyles = {
    primary:
      'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 border border-transparent shadow-xs',
    secondary:
      'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',
    accent:
      'bg-[#8F5D2C] text-white hover:bg-[#784D23] active:bg-[#633F1C] border border-transparent shadow-xs',
    ghost:
      'bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 active:bg-neutral-200',
    outline:
      'bg-transparent text-neutral-900 border border-neutral-200 hover:border-neutral-900 active:bg-neutral-50',
    danger:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 active:bg-red-200',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};

