import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn&apos;t exist or has been moved.</p>
            <Link href="/dashboard">
                <Button size="lg">Return to Dashboard</Button>
            </Link>
        </div>
    )
}
