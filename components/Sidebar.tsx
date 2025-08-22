"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  FileText,
  FileCheck,
  User,
  Wallet,
  LineChart,
  Book,
  Database,
  ArrowRightLeft,
  BarChart3,
  Globe,
  Users,
  Settings,
  LogOut,
  Briefcase,
  BarChart2,
  MessageCircle,
  Shield,
  Key,
  X,
} from "lucide-react";

import clsx from "clsx";
import logo from "../assets/bdfx.gif";
import Image from "next/image";

export default function Sidebar({
  showSidebar = false,
  onClose,
}: {
  showSidebar?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState({
    mt5: false,
    market: false,
    settings: false,
  });

  const toggle = (section: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-50 h-full w-64 bg-[#0b121a] text-white flex flex-col transition-transform duration-300 lg:translate-x-0",
        showSidebar ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo and Close (Mobile Only) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <Image src={logo} alt="Billion Dollar FX" width={150} />
        <button
          onClick={onClose}
          className="lg:hidden text-white hover:text-gray-400"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-16">
        {/* QUICK ACCESS */}
        <Section title="Quick Access">
          <NavLink
            href="/dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            pathname={pathname}
          />

          <Dropdown
            label="MT5 Accounts"
            icon={User}
            isOpen={open.mt5}
            onToggle={() => toggle("mt5")}
            items={[
              { label: "Live Accounts", href: "live-accounts", icon: FileText },
              {
                label: "Demo Accounts",
                href: "demo-accounts",
                icon: FileCheck,
              },
            ]}
            pathname={pathname}
          />

          <NavLink
            href="/web-trader"
            label="MT5 Web Trader"
            icon={Globe}
            pathname={pathname}
          />
          <NavLink
            href="/Ourplatform"
            label="Platform"
            icon={BarChart3}
            pathname={pathname}
          />
          <NavLink
            href="/technical-analysis"
            label="Technical Analysis"
            icon={LineChart}
            pathname={pathname}
          />
        </Section>

        {/* FUNDS */}
        <Section title="Funds">
          <NavLink
            href="/deposits"
            label="Deposits"
            icon={Wallet}
            pathname={pathname}
          />
          <NavLink
            href="/withdrawals"
            label="Withdrawals"
            icon={ArrowRightLeft}
            pathname={pathname}
          />
          <NavLink
            href="/transfers"
            label="Transfers"
            icon={Database}
            pathname={pathname}
          />
          <NavLink
            href="/transactions"
            label="Transactions"
            icon={BarChart2}
            pathname={pathname}
          />
        </Section>

        {/* RESOURCES */}
        <Section title="Resources & Insights">
          <NavLink
            href="/forex-glossary"
            label="Forex Glossary"
            icon={Book}
            pathname={pathname}
          />
          <Dropdown
            label="Market Data"
            icon={LineChart}
            isOpen={open.market}
            onToggle={() => toggle("market")}
            items={[
              {
                label: "Live Market Rates",
                href: "/live-markets-rates",
                icon: BarChart3,
              },
              {
                label: "News Feed",
                href: "/top-news",
                icon: MessageCircle,
              },
              {
                label: "Forex Indicators",
                href: "/indicators",
                icon: BarChart2,
              },
            ]}
            pathname={pathname}
          />
        </Section>

        {/* TOOLS */}
        <Section title="Tools & Add-Ons">
          {/* <NavLink
            href="/social-trading"
            label="Social Trading"
            icon={Users}
            pathname={pathname}
          /> */}
          {/* <NavLink
            href="/pamm"
            label="PAMM"
            icon={Briefcase}
            pathname={pathname}
          /> */}
          <NavLink
            href="/ib"
            label="Introducing Broker"
            icon={User}
            pathname={pathname}
          />
          <NavLink
            href="/support"
            label="Support Tickets"
            icon={MessageCircle}
            pathname={pathname}
          />
        </Section>

        {/* PROFILE */}
        <Section title="Profile">
          <NavLink
            href="/settings"
            label="Settings"
            icon={Settings}
            pathname={pathname}
          />
          <NavLink
            href="/signout"
            label="Signout"
            icon={LogOut}
            pathname={pathname}
          />
        </Section>
      </div>
    </div>
  );
}

// Reusable Components
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="text-sm uppercase text-gray-400 mb-2">{title}</p>
      {children}
    </div>
  );
}

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
        "flex items-center gap-2 px-4 py-2 rounded hover:text-[var(--primary)] transition-all text-sm",
        isActive && "text-[var(--primary)] font-semibold"
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  icon: Icon,
  isOpen,
  onToggle,
  items,
  pathname,
}: {
  label: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string; icon: React.ElementType }[];
  pathname: string;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-2 rounded hover:text-[var(--primary)] transition-all text-sm"
      >
        <span className="flex items-center gap-2">
          <Icon size={16} />
          {label}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
