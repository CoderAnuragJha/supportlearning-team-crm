import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { 
  FiFolder, 
  FiStar,
  FiBook,
  FiHome,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: IconType;
}

const navigation: NavItem[] = [
  { title: "Home", href: "/", icon: FiHome },
  { title: "Cases", href: "/cases", icon: FiFolder },
  { title: "Surveys", href: "/surveys", icon: FiStar },
  { title: "Knowledge Base", href: "/knowledge", icon: FiBook },
];

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 md:hidden z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card transform transition-transform duration-200 ease-in-out",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">SupportLearning Team</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <button
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}