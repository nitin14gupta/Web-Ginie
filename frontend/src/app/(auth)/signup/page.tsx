"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/api";
import { Wand2, Mail, Lock, User, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen w-full bg-black antialiased relative flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Animated background blobs */}
      <div className="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
      </div>
      <div className="absolute -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-20"></div>
      </div>

      <div className="relative max-w-md w-full mx-auto">
        <div className="relative group">
          {/* Card gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <div className="relative rounded-2xl p-8 bg-black/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
                  <div className="relative bg-black rounded-full p-4">
                    <Wand2 className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
                Create an Account
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Join AIGen to start creating amazing websites
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="firstName" className="text-gray-200 ml-1 mb-1 block">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="pl-10 bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600/50"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Label htmlFor="lastName" className="text-gray-200 ml-1 mb-1 block">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="pl-10 bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="text-gray-200 ml-1 mb-1 block">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600/50"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="password" className="text-gray-200 ml-1 mb-1 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-black/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600/50"
                    />
                  </div>
                </div>
              </div>

              <button
                className="relative w-full inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
                type="submit"
                disabled={loading}
              >
                <span className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></span>
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Sign up
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
