"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import AstrologerSidebar from "@/components/astrologer/Sidebar";
import { useAuthToken } from '@/hooks/useAuthToken';

// Cache for verification status to avoid repeated API calls
let verificationCache: { status: string; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const AstrologerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authState, setAuthState] = useState<{
    isChecking: boolean;
    isAuthenticated: boolean;
    isVerified: boolean;
    hasCheckedOnce: boolean;
  }>({
    isChecking: false,
    isAuthenticated: false,
    isVerified: true,
    hasCheckedOnce: false,
  });

  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthToken();

  // Memoize route checks to prevent recalculation
  const isAuthRoute = useMemo(() => {
    return pathname?.includes("/astrologer/auth") ||
           pathname?.includes("/astrologer/register") ||
           pathname?.includes("/astrologer/reset-password") ||
           pathname?.includes("/astrologer/forgot-password");
  }, [pathname]);

  const isProfilePage = useMemo(() => pathname === "/astrologer/profile", [pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Optimized verification check with caching
  const checkVerificationStatus = useCallback(async (authToken: string) => {
    // Check cache first
    if (verificationCache && 
        Date.now() - verificationCache.timestamp < CACHE_DURATION) {
      return verificationCache.status;
    }

    try {
      const response = await fetch("/api/astrologer/verification", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
      if (!response.ok) throw new Error('Verification check failed');
      
      const data = await response.json();
      const status = data.verification?.status || 'unverified';
      
      // Update cache
      verificationCache = { status, timestamp: Date.now() };
      
      return status;
    } catch (error) {
      console.error('Verification check error:', error);
      return 'unverified';
    }
  }, []);

  // Auth and verification check - only run once or when token changes
  useEffect(() => {
    if (isAuthRoute) return;

    const performAuthCheck = async () => {
      // If no token, redirect to auth
      if (!token) {
        router.push("/astrologer/auth");
        return;
      }

      // If already checked and has valid token, skip
      if (authState.hasCheckedOnce && authState.isAuthenticated && token) {
        return;
      }

      setAuthState(prev => ({ ...prev, isChecking: true }));

      try {
        const verificationStatus = await checkVerificationStatus(token);
        const isVerified = verificationStatus === "approved";
        
        setAuthState({
          isChecking: false,
          isAuthenticated: true,
          isVerified,
          hasCheckedOnce: true,
        });

        // Only redirect if not verified and not on profile page
        if (!isVerified && !isProfilePage) {
          router.push("/astrologer/profile");
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({
          isChecking: false,
          isAuthenticated: false,
          isVerified: false,
          hasCheckedOnce: true,
        });
        router.push("/astrologer/auth");
      }
    };

    performAuthCheck();
  }, [token, isAuthRoute, isProfilePage, router, checkVerificationStatus, authState.hasCheckedOnce, authState.isAuthenticated]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Clear cache when user logs out
  const handleLogout = useCallback(() => {
    verificationCache = null; // Clear cache
    localStorage.removeItem("astrologerToken");
    setAuthState({
      isChecking: false,
      isAuthenticated: false,
      isVerified: false,
      hasCheckedOnce: false,
    });
    router.push("/astrologer/auth");
  }, [router]);

  // Map status to allowed values for AstrologerSidebar
  const sidebarStatus = authState.isVerified ? 'verified' : (isProfilePage ? 'pending' : undefined);

  // 🔁 If it's an auth-related page, skip layout
  if (isAuthRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  // Show loading spinner while checking auth or verification
  if (authState.isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Sidebar - Only show if verified or on profile page */}
      {(authState.isVerified || isProfilePage) && <AstrologerSidebar approvalStatus={sidebarStatus} />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-amber-new dark:bg-black border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
          <div className="text-lg font-semibold ml-10 md:ml-32 w-full text-center">
            Astrologer Dashboard
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="text-gray-600 dark:text-gray-300" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="md:pl-72 flex-1 overflow-y-auto bg-amber-50 dark:bg-midnight-black p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AstrologerLayout;
