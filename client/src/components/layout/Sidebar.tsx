import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Library, PlusCircle, BookOpen } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/catalog", label: "Thesis Catalog", icon: Library },
    { href: "/add", label: "Add Thesis", icon: PlusCircle },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6" />
          <span>UniThesis</span>
        </Link>
      </div>
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}>
                  <Icon className="h-4 w-4" />
                  {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4 text-xs text-muted-foreground">
        <p>© 2025 University IT Dept.</p>
        <p>Thesis Management System</p>
      </div>
    </div>
  );
}
