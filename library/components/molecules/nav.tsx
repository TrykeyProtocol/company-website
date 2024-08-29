"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../atoms/button";
import Logo from "../atoms/logo";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "../atoms/theme-switch";

const Heading: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="px-2 lg:px-4 py-2 rounded-md text-sm font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent transition-colors duration-200"
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-lightMode-background-main dark:bg-darkMode-background-main shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-16 lg:h-20">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-4">
            <Heading href="/">About Us</Heading>
            <Heading href="/">Dashboard</Heading>
            <Heading href="/">Features</Heading>
            <Heading href="/">News</Heading>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-4">
            <ThemeSwitch />
            <Button
              variant="primary"
              size="medium"
              className="text-sm xl:text-base px-3 py-1.5 xl:px-4 xl:py-2"
            >
              Sign Up Now
            </Button>
          </div>
          <div className="flex items-center lg:hidden">
            <ThemeSwitch />
            <button
              onClick={toggleMenu}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-lightMode-text-main dark:text-darkMode-text-main hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightMode-brand-primary dark:focus:ring-darkMode-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate"
            >
              About Us
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate"
            >
              Dashboard
            </Link>
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate"
            >
              Features
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 rounded-md text-base font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate"
            >
              News
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-lightMode-brand-secondary dark:border-darkMode-brand-secondary">
            <div className="px-2">
              <Button variant="primary" size="medium" className="w-full">
                Sign Up Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
