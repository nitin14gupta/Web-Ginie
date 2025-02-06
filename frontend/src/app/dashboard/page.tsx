'use client';
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-zinc-900 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">
              Welcome, {user?.firstName || 'User'}!
            </h1>
            <div className="text-gray-300">
              <p>This is your protected dashboard page.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
} 