"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Tag,
  Watch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/products",
      label: "Watches",
      icon: Watch,
      active: pathname.includes("/dashboard/products"),
    },
    {
      href: "/dashboard/categories",
      label: "Categories",
      icon: Tag,
      active: pathname.includes("/dashboard/categories"),
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: ShoppingCart,
      active: pathname.includes("/dashboard/orders"),
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: Users,
      active: pathname.includes("/dashboard/customers"),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname.includes("/dashboard/settings"),
    },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-50"
          >
            <Menu className="text-4xl w-10 h-10" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md group",
                    route.active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <route.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      route.active
                        ? "text-gray-700"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {route.label}
                </Link>
              ))}
            </nav>
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-600"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
