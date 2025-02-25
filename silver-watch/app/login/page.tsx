"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { X } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/users";
import { USERS_URL } from "@/handler/apiConfig";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function LoginPage() {
  const { login, loading } = useAuth();
  const { useFetchData } = useApi<User>(USERS_URL);
  const { data: user, refetch: refetchUser } = useFetchData(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { handleError } = useApiErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: { email: string; password: string }) {
    try {
      const response = await login(data.email, data.password);
      if (response) {
        await refetchUser(); // Fetch latest user data
        setIsAuthenticated(true);
      }
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    const rolePaths: Record<string, string> = {
      caregiver: "/dashboard/caregiver",
      patient: "/dashboard/patient",
      admin: "/dashboard/admin",
      technician: "/dashboard/technician",
    };
    if (isAuthenticated && user?.results?.[0]?.role) {
      const role = user.results[0].role;
      if (rolePaths[role]) {
        toast.success(`Welcome back, ${role}!`);
        router.push(rolePaths[role]);
      } else {
        router.push("/forbidden");
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative">
      <Card className="w-full max-w-[400px] relative">
        {/* Close (X) Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} type="email" placeholder="john@example.com" required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register("password")} type="password" required />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
