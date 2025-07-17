"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoseQuartzRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/shop/rose-quartz-bracelet");
  }, [router]);
  return null;
} 