"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpDown, Eye } from "lucide-react";
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

const initialOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2023-05-01",
    total: 129.99,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    date: "2023-05-02",
    total: 79.99,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: "2023-05-03",
    total: 249.99,
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-04",
    total: 99.99,
    status: "Pending",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    date: "2023-05-05",
    total: 349.99,
    status: "Delivered",
    items: 4,
  },
  {
    id: "ORD-006",
    customer: "Jessica Taylor",
    date: "2023-05-06",
    total: 199.99,
    status: "Cancelled",
    items: 2,
  },
  {
    id: "ORD-007",
    customer: "Robert Martinez",
    date: "2023-05-07",
    total: 159.99,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Jennifer Anderson",
    date: "2023-05-08",
    total: 89.99,
    status: "Shipped",
    items: 1,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders..."
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
            <DropdownMenuItem>All Orders</DropdownMenuItem>
            <DropdownMenuItem>Delivered</DropdownMenuItem>
            <DropdownMenuItem>Processing</DropdownMenuItem>
            <DropdownMenuItem>Shipped</DropdownMenuItem>
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Cancelled</DropdownMenuItem>
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
            <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
            <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
            <DropdownMenuItem>Total (High to Low)</DropdownMenuItem>
            <DropdownMenuItem>Total (Low to High)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.date}
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeClass(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.items}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
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
