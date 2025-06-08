"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useCategories, useProducts } from "@/hooks/useDataStorage";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: categories, updateItem: updateCategory } = useCategories();  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (
      !productData.name ||
      !productData.price ||
      !productData.category ||
      !productData.stock
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productData.name,
      price: Number.parseFloat(productData.price),
      category: productData.category,
      stock: Number.parseInt(productData.stock),
      status:
        Number.parseInt(productData.stock) > 0
          ? Number.parseInt(productData.stock) <= 10
            ? "Low Stock"
            : "In Stock"
          : "Out of Stock",
      sku: productData.sku,
      description: productData.description,
      image: imagePreview || "/placeholder.svg",
    };
    const productSuccess = await addProduct(newProduct);
    
    if (!productSuccess) {
      toast.error("Failed to add watch");
      setIsSubmitting(false);
      return;
    }
    const categoryToUpdate = categories.find(cat => cat.slug === productData.category);
    if (categoryToUpdate) {
      await updateCategory(categoryToUpdate.id, {
        productCount: categoryToUpdate.productCount + 1
      });
    }

    toast.success("Watch added successfully");

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard/products");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/products")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold">Add New Watch</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Watch Name</Label>
              <Input
                id="name"
                placeholder="Enter watch name"
                value={productData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={productData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={productData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                min="0"
                value={productData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
              <Input
                id="sku"
                placeholder="Enter SKU"
                value={productData.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Watch Description</Label>
              <Textarea
                id="description"
                placeholder="Enter watch description"
                className="min-h-[150px]"
                value={productData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Watch Images</Label>
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Watch preview"
                        className="w-full h-48 object-contain mb-2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-gray-100 rounded-full">
                        <Upload className="h-8 w-8 text-gray-500" />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-sm font-medium">
                          Drag & drop files or click to upload
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports JPG, PNG and GIF up to 5MB
                        </p>
                      </div>
                    </>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    className={imagePreview ? "hidden" : ""}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {!imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                    >
                      Select Files
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/dashboard/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Watch"}
          </Button>
        </div>
      </form>
    </div>
  );
}
