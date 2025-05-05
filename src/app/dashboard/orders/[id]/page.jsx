"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockOrder = {
  id: "ORD-001",
  customer: {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(123) 456-7890",
  },
  shipping: {
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  billing: {
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  payment: {
    method: "Credit Card",
    cardLast4: "4242",
    status: "Paid",
  },
  items: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      total: 99.99,
    },
    {
      id: 2,
      name: "Phone Case",
      price: 29.99,
      quantity: 1,
      total: 29.99,
    },
  ],
  subtotal: 129.98,
  shipping_cost: 9.99,
  tax: 10.4,
  total: 150.37,
  status: "Delivered",
  date: "2023-05-01",
  tracking_number: "TRK123456789",
};

export default function OrderDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOrder(mockOrder);
      setOrderStatus(mockOrder.status);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleStatusChange = (value) => {
    setOrderStatus(value);
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 1000);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/orders")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <p className="text-gray-500">Placed on {order.date}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Order
          </Button>
          <Select value={orderStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Contact Details</h3>
              <p>{order.customer.name}</p>
              <p>{order.customer.email}</p>
              <p>{order.customer.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{order.shipping.address}</p>
                <p>
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.zip}
                </p>
                <p>{order.shipping.country}</p>
              </div>
              <div>
                <h3 className="font-semibold">Billing Address</h3>
                <p>{order.billing.address}</p>
                <p>
                  {order.billing.city}, {order.billing.state}{" "}
                  {order.billing.zip}
                </p>
                <p>{order.billing.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <Badge className={getBadgeClass(orderStatus)}>
                {isUpdating ? "Updating..." : orderStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment Method</span>
              <span>
                {order.payment.method} (**** {order.payment.cardLast4})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment Status</span>
              <Badge variant="outline">{order.payment.status}</Badge>
            </div>
            {order.tracking_number && (
              <div className="flex items-center justify-between">
                <span>Tracking Number</span>
                <span className="font-mono">{order.tracking_number}</span>
              </div>
            )}
            <Separator />
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Shipping</span>
                <span>${order.shipping_cost.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            {order.items.length} item{order.items.length !== 1 ? "s" : ""} in
            this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
