"use client";
import React from "react";
import { Index } from "@/Components/Sidebar/Index";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Index />
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-slate-200 mx-16 rounded h-5/6 w-[90%] overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
