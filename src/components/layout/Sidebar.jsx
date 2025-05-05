"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Tag,
  Watch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/products",
      label: "Products",
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
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 px-2 mt-8 space-y-2 bg-white">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-3 font-medium rounded-md group",
                route.active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
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
    </aside>
  );
}
