"use client";

import type React from "react";

import { useRef } from "react";
import { useRouter } from "next/navigation";  // ✅ instead of redirect
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import {useLoginMutation} from "@/features/api/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/slice/userSlice";


export default function LoginPage() {
  const dispatch = useDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login,{isLoading}] = useLoginMutation();
  const router = useRouter(); // ✅

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = emailRef.current?.value ?? "";
      const password = passwordRef.current?.value ?? "";

      const res = await login({ email, password, isAdminLogin: true }).unwrap();
      dispatch(setCredentials({ user: res.data }));
      router.push("/dashboard");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const err = error as { data?: { message?: string } };
        toast.error(err.data?.message || "Login failed. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login </CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@esports.com"
                ref={emailRef}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
