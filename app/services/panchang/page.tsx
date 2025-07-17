"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PanchangRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/panchang");
  }, [router]);
  return null;
} 