import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={cn("bg-choco-500 text-vanilla py-2 pt-3 px-4 shadow-button text-xl cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}