"use client";

import React from "react";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button
      className={
        "bg-choco-500 text-vanilla font-times py-2 px-4 w-fit shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      }
    >
      {children}
    </button>
  );
}
