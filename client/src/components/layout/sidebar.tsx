import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { 
  FiFolder, 
  FiStar,
  FiBook,
  FiHome
} from "react-icons/fi";

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

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r bg-card">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">Support CRM</h2>
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
  );
}