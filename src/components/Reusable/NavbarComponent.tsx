// components/NavbarComponent.tsx - UPDATED
"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { useStickyTabs } from '@/hooks/useStickyTabs';
import type { Tab } from '@/types/dashBoardTypes';

interface NavbarComponentProps {
  dashboardTabs?: Tab[];
  activeDashboardTab?: string;
  onDashboardTabChange?: (tabId: string) => void;
  dashboardBgColor?: string;
}

export default function NavbarComponent({ 
  dashboardTabs, 
  activeDashboardTab, 
  onDashboardTabChange,
  dashboardBgColor = 'bg-violet-950'
}: NavbarComponentProps) {
  const showStickyTabs = useStickyTabs('dashboard-header');
  
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Users", link: "/users" },
    { name: "Projects", link: "/projects" },
    { name: "Asset", link: "/asset" },
    { name: "Test", link: "/test" },
    { name: "Dashboard", link: "/dashBoardDumy" },
    { name: "statCard", link: "/statCardUsage" },
    { name: "Stores", link: "/storeManagement" },
    { name: "Components", link: "/displaycomponents" },
    { name: "UsersForm", link: "/displayusersform" },
  ];

  return (
    <Navbar 
      maxWidth="full" 
      className="bg-white backdrop-blur-md shadow-sm"
      classNames={{
        wrapper: "px-4"
      }}
    >
      {/* Brand / Logo */}
      <NavbarBrand>
        <p className="font-bold text-inherit">Lyncs 2.0</p>
      </NavbarBrand>

      {/* Center Navigation Items - Hide when sticky tabs show */}
      {!showStickyTabs && (
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          {navItems.map((item, idx) => (
            <NavbarItem key={idx}>
              <Link color="foreground" size="sm" className="font-semibold" href={item.link}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {/* Sticky Dashboard Tabs - Show when scrolled past header */}
      {showStickyTabs && dashboardTabs && onDashboardTabChange && (
        <NavbarContent className="hidden md:flex gap-2 flex-1" justify="center">
          {dashboardTabs.slice(0, 6).map((tab) => (
            <NavbarItem key={tab.id}>
              <button
                onClick={() => onDashboardTabChange(tab.id)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeDashboardTab === tab.id
                    ? `${dashboardBgColor} text-white`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="w-4 h-4 mr-1.5">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {/* Right-side Buttons */}
      <NavbarContent justify="end">
        {/* Commented out auth buttons */}
      </NavbarContent>
    </Navbar>
  );
}
