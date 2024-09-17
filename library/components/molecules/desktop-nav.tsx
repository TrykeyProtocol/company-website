import React from "react";
import Logo from "@/library/components/atoms/logo";
import { Home, Bell, Settings } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  return (
    <div className="hidden md:block w-1/5 bg-lightMode-background-main dark:bg-darkMode-background-main py-6 pl-4">
      <div className="flex items-center mb-10 pl-6">
        <a href="/">
          <Logo />
        </a>
      </div>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center py-2.5 pl-5 rounded-l-full text-lightMode-text-heading dark:text-darkMode-text-heading hover:bg-lightMode-background-secondary dark:hover:bg-darkMode-background-secondary"
              >
                {item.icon}
                <span className="ml-2 font-semibold">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNav;
