"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../atoms/button";
import Logo from "../atoms/logo";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "../atoms/theme-switch";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/library/utils";

interface HeadingProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ href, children, onClick, className }) => {
  const router = useRouter();
  const smoothScroll = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      smoothScroll(targetId);
    } else {
      router.push(href);
    }
    if (onClick) onClick();
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const desktopLinkStyle =
    "px-2 lg:px-4 py-2 rounded-md font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent transition-colors duration-200";
  const mobileLinkStyle =
    "block px-3 py-2 rounded-md text-base font-medium text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? "bg-lightMode-background-main/80 dark:bg-darkMode-background-main/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-24">
            <div className="flex items-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-4">
              <Heading href="/#about-us" className={desktopLinkStyle}>
                About Us
              </Heading>
              <Heading href="/" className={desktopLinkStyle}>
                Dashboard
              </Heading>
              <Heading href="/#features" className={desktopLinkStyle}>
                Features
              </Heading>
              <Heading href="/" className={desktopLinkStyle}>
                News
              </Heading>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-4">
              <ThemeSwitch />
              <Button
                variant="primary"
                size="medium"
                className="text-sm xl:text-base px-3 py-1.5 xl:px-4 xl:py-2"
                href="/sign-up"
              >
                Sign Up Now
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <ThemeSwitch />
              <button
                onClick={toggleMenu}
                type="button"
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightMode-brand-primary dark:focus:ring-darkMode-brand-primary"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={menuRef}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-4/5 max-w-sm z-[70] bg-lightMode-background-main/90 dark:bg-darkMode-background-main/90 backdrop-blur-md overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="sticky top-0 px-4 pt-4 pb-3 flex justify-between items-center bg-lightMode-background-main/90 dark:bg-darkMode-background-main/90 backdrop-blur-md">
                <Logo />
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-lightMode-text-heading dark:text-darkMode-text-heading hover:text-lightMode-text-accent dark:hover:text-darkMode-text-accent hover:bg-lightMode-background-alternate dark:hover:bg-darkMode-background-alternate focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightMode-brand-primary dark:focus:ring-darkMode-brand-primary"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Heading
                  href="/#about-us"
                  onClick={toggleMenu}
                  className={mobileLinkStyle}
                >
                  About Us
                </Heading>
                <Heading
                  href="/"
                  onClick={toggleMenu}
                  className={mobileLinkStyle}
                >
                  Dashboard
                </Heading>
                <Heading
                  href="/#features"
                  onClick={toggleMenu}
                  className={mobileLinkStyle}
                >
                  Features
                </Heading>
                <Heading
                  href="/"
                  onClick={toggleMenu}
                  className={mobileLinkStyle}
                >
                  News
                </Heading>
              </div>
              <div className="pt-4 pb-3 px-4">
                <Button variant="primary" size="medium" className="w-full">
                  Sign Up Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
