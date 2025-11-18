import React from 'react';
import { cn } from '../../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          {
            // Variants
            'bg-blue-600/20 text-blue-400 border-blue-500/30':
              variant === 'primary',
            'bg-gray-600/20 text-gray-400 border-gray-500/30':
              variant === 'secondary',
            'bg-green-600/20 text-green-400 border-green-500/30':
              variant === 'success',
            'bg-yellow-600/20 text-yellow-400 border-yellow-500/30':
              variant === 'warning',
            'bg-red-600/20 text-red-400 border-red-500/30':
              variant === 'danger',
            'bg-cyan-600/20 text-cyan-400 border-cyan-500/30':
              variant === 'info',

            // Sizes
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';