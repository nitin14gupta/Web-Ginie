"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
      // The router.push is handled in the AuthContext
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-black antialiased bg-grid-white/[0.02] relative flex items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-900 border border-zinc-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-xl text-white text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto text-center mb-8">
            Login to continue your journey with AIGen
          </p>
        </motion.div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
              />
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 w-full text-white rounded-md h-10 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

            <div className="bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
