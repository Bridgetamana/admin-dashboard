import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ProductsPage() {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Products Page</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Manage your products with our easy-to-use admin dashboard.
            </p>
            <Link href="/dashboard/products/new">
                <Button size="lg">Add New Product</Button>
            </Link>
        </div>
    )
}