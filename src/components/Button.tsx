"use client";

import React from "react";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return <div className="bg-primary text-vanilla font-times py-2 px-4 ">{children}</div>;
}
