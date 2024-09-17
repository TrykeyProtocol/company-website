import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, navItems }) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div ref={navRef} className={`absolute right-0 top-0 h-full w-64 bg-lightMode-background-main dark:bg-darkMode-background-main transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <button onClick={onClose} className="mb-4 text-lightMode-text-main dark:text-darkMode-text-main">
            <X size={24} />
          </button>
          <nav>
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="flex items-center py-2 text-lightMode-text-main dark:text-darkMode-text-main">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;