"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (formName) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`${formName} settings saved successfully`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Basic information about your watch store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Chrono Elegance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Contact Email</Label>
                <Input
                  id="store-email"
                  type="email"
                  defaultValue="contact@chronoelegance.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Contact Phone</Label>
                <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Textarea
                  id="store-address"
                  defaultValue="123 Timepiece Avenue, Watchville, NY 10001"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSave("Store information")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency & Locale</CardTitle>
              <CardDescription>
                Configure how prices and dates are displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="USD"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CHF">CHF (Fr)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="America/New_York"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">
                    Greenwich Mean Time (GMT)
                  </option>
                  <option value="Europe/Paris">
                    Central European Time (CET)
                  </option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSave("Currency & locale")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Settings</CardTitle>
              <CardDescription>
                Configure how products are displayed and managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-stock">Show Stock Levels</Label>
                  <p className="text-sm text-gray-500">
                    Display remaining stock to customers
                  </p>
                </div>
                <Switch id="show-stock" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock">Low Stock Notification</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when stock is low
                  </p>
                </div>
                <Switch id="low-stock" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                <Input
                  id="low-stock-threshold"
                  type="number"
                  defaultValue="5"
                  min="1"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="out-of-stock">
                    Allow Out of Stock Purchases
                  </Label>
                  <p className="text-sm text-gray-500">
                    Allow customers to order out of stock items
                  </p>
                </div>
                <Switch id="out-of-stock" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSave("Product settings")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping & Delivery</CardTitle>
              <CardDescription>
                Configure shipping options for your watch store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="free-shipping">Free Shipping</Label>
                  <p className="text-sm text-gray-500">
                    Offer free shipping on all orders
                  </p>
                </div>
                <Switch id="free-shipping" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">
                  Free Shipping Threshold ($)
                </Label>
                <Input
                  id="free-shipping-threshold"
                  type="number"
                  defaultValue="150"
                  min="0"
                />
                <p className="text-xs text-gray-500">
                  Orders above this amount qualify for free shipping
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-flat-rate">
                  Flat Rate Shipping ($)
                </Label>
                <Input
                  id="shipping-flat-rate"
                  type="number"
                  defaultValue="9.99"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="international-shipping">
                    International Shipping
                  </Label>
                  <p className="text-sm text-gray-500">
                    Ship orders internationally
                  </p>
                </div>
                <Switch id="international-shipping" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSave("Shipping & delivery")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when and how you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-order">New Order</Label>
                  <p className="text-sm text-gray-500">
                    Receive an email when a new order is placed
                  </p>
                </div>
                <Switch id="new-order" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-status">Order Status Updates</Label>
                  <p className="text-sm text-gray-500">
                    Receive emails when order status changes
                  </p>
                </div>
                <Switch id="order-status" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock-email">Low Stock Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Receive emails when products are low in stock
                  </p>
                </div>
                <Switch id="low-stock-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="customer-account">
                    Customer Account Activity
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive emails about new customer registrations
                  </p>
                </div>
                <Switch id="customer-account" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSave("Email notifications")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Export</CardTitle>
              <CardDescription>
                Manage your store data and exports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Database Backup</Label>
                <p className="text-sm text-gray-500">
                  Create a backup of your store data
                </p>
                <Button variant="outline" className="mt-2">
                  Generate Backup
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Export Products</Label>
                <p className="text-sm text-gray-500">
                  Export your products as CSV
                </p>
                <Button variant="outline" className="mt-2">
                  Export Products
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Export Orders</Label>
                <p className="text-sm text-gray-500">
                  Export your orders as CSV
                </p>
                <Button variant="outline" className="mt-2">
                  Export Orders
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Export Customers</Label>
                <p className="text-sm text-gray-500">
                  Export your customers as CSV
                </p>
                <Button variant="outline" className="mt-2">
                  Export Customers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Reset Store Data</Label>
                <p className="text-sm text-gray-500">
                  This will reset all your store data. This action cannot be
                  undone.
                </p>
                <Button variant="destructive" className="mt-2">
                  Reset Store Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
