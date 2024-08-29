"use client";
import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { 
  SiX,
  SiFacebook,
  SiInstagram,
  SiLinkedin
} from '@icons-pack/react-simple-icons';
import { motion } from "framer-motion";
import Logo from "../atoms/logo";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface ContactItemProps {
  Icon: LucideIcon;
  children: React.ReactNode;
}

interface LinkItem {
  href: string;
  text: string;
}

interface ContactInfo {
  Icon: LucideIcon;
  text: string;
}

interface SocialLink {
  Icon: any;
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="hover:text-lightMode-brand-asset dark:hover:text-darkMode-brand-asset"
    >
      {children}
    </Link>
  </li>
);

const ContactItem: React.FC<ContactItemProps> = ({ Icon, children }) => (
  <li className="flex items-start">
    <Icon size={24} className="mr-3 flex-shrink-0 mt-1" />
    <span>{children}</span>
  </li>
);

const SocialLink: React.FC<SocialLink> = ({ href, Icon }) => (
  <Link
    href={href}
    className="text-lightMode-text-main dark:text-darkMode-text-main hover:text-lightMode-brand-accent dark:hover:text-darkMode-brand-accent transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={24} />
  </Link>
);

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const whyChooseUsLinks: LinkItem[] = [
    { href: "#", text: "Features" },
    { href: "#", text: "Usecases" },
    { href: "#", text: "Case Studies" },
    { href: "#", text: "Reviews" },
    { href: "#", text: "Updates" },
  ];

  const companyLinks: LinkItem[] = [
    { href: "#", text: "About Us" },
    { href: "#", text: "Blog" },
    { href: "#", text: "Contact Us" },
    { href: "#", text: "Careers" },
    { href: "#", text: "Culture" },
  ];

  const contactInfo: ContactInfo[] = [
    { Icon: Mail, text: "info@trykeyprotocol.com" },
    { Icon: Phone, text: "+234 (810) 827-3624" },
    {
      Icon: MapPin,
      text: "2nd floor, National Center for Artificial Intelligence and Robotics, Wuye, Abuja.",
    },
  ];

  const socialLinks: SocialLink[] = [
    { Icon: SiX, href: "https://x.com/trykeyprotocol/" },
    { Icon: SiFacebook, href: "https://web.facebook.com/trykeyprotocol" },
    { Icon: SiInstagram, href: "https://www.instagram.com/trykeyprotocol/" },
    { Icon: SiLinkedin, href: "https://www.linkedin.com/company/trykeyprotocol/" },
  ];

  return (
    <motion.footer
      className="py-12 px-4 md:px-6 lg:px-8 bg-lightMode-background-main dark:bg-darkMode-background-main text-lightMode-text-main dark:text-darkMode-text-main"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div
            className="col-span-2 md:col-span-3 lg:col-span-2"
            variants={itemVariants}
          >
            <Logo />
            <p className="my-4 font-light">
              Securing DeFi Yield on Infrastructures Using Sensors
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
              Why Choose Us?
            </h3>
            <ul className="space-y-2">
              {whyChooseUsLinks.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.text}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.text}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Get in touch */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
              Get in touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <ContactItem key={index} Icon={item.Icon}>
                  {item.text}
                </ContactItem>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} TryKey. All Rights Reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;