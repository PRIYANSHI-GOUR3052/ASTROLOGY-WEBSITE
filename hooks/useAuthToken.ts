import { useEffect, useState } from "react";

export function useAuthToken(tokenKey = "astrologerToken") {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the token immediately
    const t = localStorage.getItem(tokenKey);
    if (t) {
      setToken(t);
      return;
    }
    // Listen for storage events (in case login happens in another tab)
    function handleStorage() {
      const t = localStorage.getItem(tokenKey);
      if (t) setToken(t);
    }
    window.addEventListener("storage", handleStorage);
    // Poll every 100ms until token is found
    let interval: NodeJS.Timeout | null = null;
    if (!t) {
      interval = setInterval(() => {
        const t = localStorage.getItem(tokenKey);
        if (t) {
          setToken(t);
          if (interval) clearInterval(interval);
        }
      }, 100);
    }
    return () => {
      window.removeEventListener("storage", handleStorage);
      if (interval) clearInterval(interval);
    };
  }, [tokenKey]);

  return token;
} 