"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";
import { useState } from "react";


export function NavbarComponent() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Users", link: "/users" },
    { name: "Projects", link: "/projects" },
    { name: "Dashboard", link: "/dashboard" },
    // { name: "Login", link: "/login" },
    // { name: "Footer", link: "/Footer" },
    { name: "cardview", link: "/cardView" },
    { name: "Components", link: "/displaycomponents" },
    {name: "statCard", link: "/statCardUsage"},
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full sticky top-0 z-50 ">
      <Navbar
        className="
    bg-white backdrop-blur-lg
    text-white 
  "
      >
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            className="hidden md:flex gap-8 text-neutral-300 hover:text-white transition-colors"
          />
          {/* <div className="hidden md:flex items-center gap-4">
            <NavbarButton color="primary" variant="secondary" href="/auth">
              Login
            </NavbarButton>
            <NavbarButton color="primary" variant="gradient">
              SignUp
            </NavbarButton>
          </div> */}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-gray-200 backdrop-blur-md"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 hover:text-white transition-colors"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                color="default"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
