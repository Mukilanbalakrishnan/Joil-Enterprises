import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  confirmVariant?: 'primary' | 'danger' | 'accent';
  isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel,
  onConfirm,
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 shadow-2xl z-10 animate-fade-in">
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
            {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 text-sm text-neutral-600">{children}</div>

        {(onConfirm || confirmLabel) && (
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <Button variant="secondary" size="md" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            {onConfirm && (
              <Button
                variant={confirmVariant}
                size="md"
                onClick={onConfirm}
                isLoading={isLoading}
              >
                {confirmLabel || 'Confirm'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

