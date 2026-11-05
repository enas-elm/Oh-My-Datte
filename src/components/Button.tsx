import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'rouge' | 'chocolat' | 'creme';

const variants: Record<ButtonVariant, string> = {
  rouge: 'border-rouge bg-rouge text-creme hover:bg-transparent hover:text-rouge',
  chocolat: 'border-chocolat bg-chocolat text-creme hover:bg-transparent hover:text-chocolat',
  creme:
    'border-creme bg-creme text-rouge hover:bg-transparent hover:text-creme focus-visible:outline-creme',
};

/**
 * Classes du bouton Oh My Datte (angles vifs, capitales Cormorant, se vide au
 * survol). Utilisable sur un <button> comme sur un lien.
 */
export function buttonClasses(variant: ButtonVariant = 'rouge', size: 'md' | 'sm' = 'md') {
  return cn(
    'inline-flex items-center justify-center gap-2 border font-display font-semibold uppercase leading-none tracking-[0.06em] shadow-bouton',
    'cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50',
    size === 'md' ? 'px-5 pb-3 pt-3.5 text-xl' : 'px-3.5 pb-2 pt-2.5 text-base',
    variants[variant],
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, variant = 'rouge', size = 'md', ...props }: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </button>
  );
}
