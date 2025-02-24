"use client";

import { useState } from "react";

const BuyNowButton = ({ price, productName }: { price: number; productName: string }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, productName }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default BuyNowButton;
