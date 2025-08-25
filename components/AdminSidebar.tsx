"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut, X, MessageSquare } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import logo from "../assets/bdfx.gif";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-[#0b121a] text-white flex flex-col border-r border-gray-700">
      {/* Header (Logo + Mobile Close Button) */}
      {/* Header (Logo & Close button — only visible on mobile) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 md:hidden">
        <Image src={logo} alt="Admin Logo" width={140} className="h-auto" />
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        )}
      </div>

      {/* Desktop-only Logo (hidden on mobile) */}
      <div className="hidden md:flex justify-center items-center px-4 py-4 border-b border-gray-800">
        <Image src={logo} alt="Admin Logo" width={160} className="h-auto" />
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <Section title="Navigation">
          <NavLink
            href="/adminDashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            pathname={pathname}
          />
          <NavLink
            href="/users"
            label="Users"
            icon={Users}
            pathname={pathname}
          />
          <NavLink
            href="/brokers"
            label="Brokers"
            icon={Users}
            pathname={pathname}
          />
          <NavLink
            href="/tickets"
            label="Support Ticket"
            icon={MessageSquare}
            pathname={pathname}
          />
        </Section>

        <Section title="Account">
          <NavLink
            href="/"
            label="Sign Out"
            icon={LogOut}
            pathname={pathname}
          />
        </Section>
      </div>
    </aside>
  );
}

// --- Reusable Section ---
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase text-gray-400 mb-2 tracking-wide">
        {title}
      </p>
      {children}
    </div>
  );
}

// --- Reusable NavLink ---
function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  pathname: string;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all",
        isActive
          ? "bg-[#1e293b] text-[var(--primary)]"
          : "hover:bg-[#1e293b] text-white/80"
      )}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}
