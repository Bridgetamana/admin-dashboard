"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCategories, useProducts } from "@/hooks/useDataStorage";


export default function CategoriesPage() {
  const { data: categories, loading: categoriesLoading, addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory } = useCategories();
  const { data: products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && products.length >= 0) {
      categories.forEach(category => {
        const count = products.filter(
          (product) =>
            product.category.toLowerCase() === category.slug.toLowerCase()
        ).length;

        if (category.productCount !== count) {
          updateCategory(category.id, { productCount: count });
        }
      });
    }
  }, [products, categories, updateCategory]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/gi, "-");
  };
  const handleAddCategory = async () => {
    setIsSubmitting(true);

    if (!newCategory.name) {
      toast.error("Category name is required");
      setIsSubmitting(false);
      return;
    }
    const slug = newCategory.slug || generateSlug(newCategory.name);
    if (categories.some((category) => category.slug === slug)) {
      toast.error("A category with this slug already exists");
      setIsSubmitting(false);
      return;
    }

    const newCategoryWithId = {
      id: Date.now(),
      name: newCategory.name,
      slug: slug,
      productCount: 0,
    };

    const success = await addCategory(newCategoryWithId);
    
    if (success) {
      toast.success("Category added successfully");
      setNewCategory({ name: "", slug: "" });
      setIsAddDialogOpen(false);
    } else {
      toast.error("Failed to add category");
    }
    
    setIsSubmitting(false);
  };  const handleEditCategory = async () => {
    setIsSubmitting(true);

    if (!categoryToEdit.name) {
      toast.error("Category name is required");
      setIsSubmitting(false);
      return;
    }
    const slug = categoryToEdit.slug || generateSlug(categoryToEdit.name);
    if (
      categories.some(
        (category) =>
          category.slug === slug && category.id !== categoryToEdit.id
      )
    ) {
      toast.error("A category with this slug already exists");
      setIsSubmitting(false);
      return;
    }

    const success = await updateCategory(categoryToEdit.id, {
      name: categoryToEdit.name,
      slug: slug
    });

    if (success) {
      toast.success("Category updated successfully");
      setIsEditDialogOpen(false);
      setCategoryToEdit(null);
    } else {
      toast.error("Failed to update category");
    }
    
    setIsSubmitting(false);
  };
  const handleDeleteCategory = async () => {
    setIsSubmitting(true);
    if (categoryToDelete.productCount > 0) {
      toast.error(
        `This category has ${categoryToDelete.productCount} watches. Please reassign them before deleting.`
      );
      setIsSubmitting(false);
      return;
    }

    const success = await deleteCategory(categoryToDelete.id);
    
    if (success) {
      toast.success("Category deleted successfully");
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } else {
      toast.error("Failed to delete category");
    }
    
    setIsSubmitting(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-3xl font-bold">Watch Categories</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoriesLoading ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-gray-500">Loading categories...</p>
            </CardContent>
          </Card>
        ) : filteredCategories.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-gray-500">No categories found</p>
            </CardContent>
          </Card>
        ) : (
          filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCategoryToEdit(category);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCategoryToDelete(category);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Slug:</span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {category.slug}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Watches:</span>
                    <Badge variant="outline">{category.productCount}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for your watches.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g. Luxury Watches"
                value={newCategory.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setNewCategory({
                    ...newCategory,
                    name,
                    slug: generateSlug(name),
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-gray-500">(auto-generated)</span>
              </Label>
              <Input
                id="slug"
                placeholder="e.g. luxury-watches"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                Used in URLs and for internal references
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNewCategory({ name: "", slug: "" });
                setIsAddDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details of this category.
            </DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g. Luxury Watches"
                  value={categoryToEdit.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setCategoryToEdit({
                      ...categoryToEdit,
                      name,
                      slug: generateSlug(name),
                    });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">
                  Slug <span className="text-gray-500">(auto-generated)</span>
                </Label>
                <Input
                  id="edit-slug"
                  placeholder="e.g. luxury-watches"
                  value={categoryToEdit.slug}
                  onChange={(e) =>
                    setCategoryToEdit({
                      ...categoryToEdit,
                      slug: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  Used in URLs and for internal references
                </p>
              </div>
              <div className="space-y-2">
                <Label>Watches in this category</Label>
                <div className="p-2 bg-gray-50 rounded">
                  <Badge variant="outline">{categoryToEdit.productCount}</Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCategoryToEdit(null);
                setIsEditDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category?
            </DialogDescription>
          </DialogHeader>
          {categoryToDelete && (
            <div className="py-2">
              <p>
                You are about to delete <strong>{categoryToDelete.name}</strong>
              </p>
              {categoryToDelete.productCount > 0 && (
                <p className="text-red-500 mt-2">
                  Warning: This category contains{" "}
                  {categoryToDelete.productCount} watches. Please reassign them
                  before deleting.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCategoryToDelete(null);
                setIsDeleteDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCategory}
              disabled={isSubmitting || categoryToDelete?.productCount > 0}
            >
              {isSubmitting ? "Deleting..." : "Delete Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
