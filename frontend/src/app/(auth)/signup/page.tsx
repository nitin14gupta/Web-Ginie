"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make the Axios POST request to the /auth/signup endpoint
      const response = await axios.post("/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Handle successful signup
      toast.success("Account created successfully!");
      router.push("/dashboard"); // Redirect to login page after successful signup
    } catch (error) {
      // Handle error (e.g., invalid credentials, etc.)
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
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
            Create an Account
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto text-center mb-8">
            Join AIGen to start creating amazing websites
          </p>
        </motion.div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email Address</Label>
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
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Create a password"
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
              {loading ? "Creating account..." : "Sign up →"}
            </button>

            <div className="bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
