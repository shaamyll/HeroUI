"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";


export default function NavbarComponent() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Users", link: "/users" },
    { name: "Projects", link: "/projects" },
    { name: "Asset", link: "/asset" },
    { name: "Test", link: "/test" },
    { name: "Dashboard", link: "/dashBoardDumy" },
    { name: "statCard", link: "/statCardUsage" },
    { name: "Settings", link: "/settingsProject" },
    { name: "Components", link: "/displaycomponents" },
    { name: "UsersForm", link: "/displayusersform" },
  ];

  return (
    <Navbar maxWidth="full" className="bg-white backdrop-blur-md shadow-sm">
      {/* Brand / Logo */}
      <NavbarBrand>
        <p className="font-bold text-inherit">Lyncs 2.0</p>
      </NavbarBrand>

      {/* Center Navigation Items */}
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        {navItems.map((item, idx) => (
          <NavbarItem key={idx}>
            <Link color="foreground" size="sm" className="font-semibold" href={item.link}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right-side Buttons */}
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
