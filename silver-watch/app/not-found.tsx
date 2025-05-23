"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-yellow-600">404 - Not Found</h1>
        <h2 className="text-2xl font-semibold">Oops! Page not found</h2>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
