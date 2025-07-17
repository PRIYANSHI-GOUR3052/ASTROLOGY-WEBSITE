"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectKundaliMatching() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/kundali-matching");
  }, [router]);
  return null;
} 