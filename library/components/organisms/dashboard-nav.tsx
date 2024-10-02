import React from "react";
import Logo from "../atoms/logo";
import {
  Menu,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  WalletMinimal,
  ChartPie,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/overview", icon: Home },
  { name: "Assets", href: "/assets", icon: WalletMinimal },
  { name: "Analytics", href: "/analytics", icon: ChartPie },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Support", href: "/support", icon: MessageCircleMore },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

const NavLink: React.FC<NavItem & { isActive: boolean }> = ({
  name,
  href,
  icon: Icon,
  isActive,
}) => (
  <Link
    href={href}
    className={`flex gap-3 items-center text rounded-2xl px-4 ${
      isActive
        ? "font-semibold py-6 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10"
        : "text-lightMode-text-main dark:text-darkMode-text-main hover:text-lightMode-button-background/80 dark:hover:text-darkMode-button-background/80"
    }`}
  >
    <Icon width={20} height={20} strokeWidth={2} />
    <p>{name}</p>
  </Link>
);

const TrykeySensors = () => (
  <div className=" bg-black rounded-2xl py-6 px-6 gap-1.5 text-white flex flex-col items-center">
    <Image
      src="/images/logo/management-kit.png"
      alt="User Avatar"
      width={120}
      height={80}
      // className=" w-[100px] h-[80px]"
    />
    <h3 className="font-bold text-center">Trykey Management Kit</h3>
    {/* <p className="text-xs text-gray-400">Available at any mall/shop</p> */}
    <button className="bg-white text-black font-semibold py-1.5 w-full rounded mt-2">
      Buy
    </button>
  </div>
);

export const DashboardNavDesktop: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen px-4 py-10 text-lightMode-text-heading dark:text-darkMode-text-heading border-r border-gray-200 dark:border-gray-800 bg-lightMode-background-main dark:bg-darkMode-background-main justify-between">
      <div className=" flex flex-col">
        <Logo />
        <nav>
          <ul className="flex flex-col gap-8 mt-16">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink {...item} isActive={pathname.startsWith(item.href)} />
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Link
            href="/"
            className="flex gap-3  items-center text rounded-2xl px-4 font-semibold mt-10 text-lightMode-text-accent dark:text-darkMode-text-accent hover:text-lightMode-button-background/80 dark:hover:text-darkMode-button-background/80"
          >
            <div className="p-2.5 bg-lightMode-brand-accent/20 rounded-xl">
              <LogOut width={20} height={20} strokeWidth={2} />
            </div>
            <p>Logout</p>
          </Link>
        </div>
      </div>

      <TrykeySensors />
    </aside>
  );
};

export const DashboardNavMobile: React.FC<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();

  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#1016304b] md:hidden z-50 flex justify-end"
      onClick={() => setIsSidebarOpen(false)}
    >
      <div
        className="w-4/5 bg-lightMode-background-main/95 dark:bg-darkMode-background-main/95 backdrop-blur-md shadow-lg p-4 flex flex-col h-full justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex flex-col">
          <Logo />
          <nav className="mt-8 ">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    {...item}
                    isActive={pathname.startsWith(item.href)}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <div className="">
            <Link
              href="/logout"
              className="flex gap-3 items-center text rounded-2xl px-4 font-semibold py-6 text-lightMode-text-accent dark:text-darkMode-text-accent hover:text-lightMode-button-background/80 dark:hover:text-darkMode-button-background/80"
            >
              <div className="p-2.5 bg-lightMode-brand-accent/20 rounded-xl">
                <LogOut width={20} height={20} strokeWidth={2} />
              </div>
              <p>Logout</p>
            </Link>
          </div>
        </div>

        <TrykeySensors />
      </div>
    </div>
  );
};