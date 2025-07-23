"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RawPyriteBraceletRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/shop/raw-pyrite-bracelet");
  }, [router]);
  return null;
} 