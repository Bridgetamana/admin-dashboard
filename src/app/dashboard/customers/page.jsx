"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown, Eye, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const initialCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    orders: 5,
    totalSpent: 1249.95,
    status: "Active",
    lastPurchase: "2023-04-15",
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 234-5678",
    orders: 3,
    totalSpent: 789.97,
    status: "Active",
    lastPurchase: "2023-05-02",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    orders: 1,
    totalSpent: 299.99,
    status: "New",
    lastPurchase: "2023-05-10",
  },
  {
    id: 4,
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+1 (555) 456-7890",
    orders: 8,
    totalSpent: 2399.92,
    status: "VIP",
    lastPurchase: "2023-05-08",
  },
  {
    id: 5,
    name: "William Wilson",
    email: "william.wilson@example.com",
    phone: "+1 (555) 567-8901",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    lastPurchase: null,
  },
  {
    id: 6,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+1 (555) 678-9012",
    orders: 2,
    totalSpent: 599.98,
    status: "Active",
    lastPurchase: "2023-04-28",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phone: "+1 (555) 789-0123",
    orders: 4,
    totalSpent: 1099.96,
    status: "Active",
    lastPurchase: "2023-05-05",
  },
  {
    id: 8,
    name: "Charlotte Thomas",
    email: "charlotte.thomas@example.com",
    phone: "+1 (555) 890-1234",
    orders: 6,
    totalSpent: 1799.94,
    status: "VIP",
    lastPurchase: "2023-05-12",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedCustomers = localStorage.getItem("adminCustomers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      setCustomers(initialCustomers);
      localStorage.setItem("adminCustomers", JSON.stringify(initialCustomers));
    }
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeClass = (status) => {
    switch (status) {
      case "VIP":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "New":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Customers</DropdownMenuItem>
            <DropdownMenuItem>VIP</DropdownMenuItem>
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>New</DropdownMenuItem>
            <DropdownMenuItem>Inactive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
            <DropdownMenuItem>Most Orders</DropdownMenuItem>
            <DropdownMenuItem>Highest Spend</DropdownMenuItem>
            <DropdownMenuItem>Most Recent Purchase</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">
                      {customer.orders}{" "}
                      {customer.orders === 1 ? "order" : "orders"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {customer.lastPurchase
                        ? `Last: ${customer.lastPurchase}`
                        : "No purchases yet"}
                    </div>
                  </TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeClass(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
