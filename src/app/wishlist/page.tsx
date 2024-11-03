"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const res = await fetch("/api/wishlist");
        if (!res.ok) {
          throw new Error("Failed to fetch wishlist items");
        }
        const data: WishlistItem[] = await res.json();
        setWishlistItems(data);
      } catch (err) {
        console.log("fetchWishlistItems ~ err:", err);
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  if (loading) {
    return <p>Loading your wishlist...</p>;
  }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  if (wishlistItems.length === 0) {
    return <p>Your wishlist is empty</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="block border rounded-lg p-4 hover:shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-lg text-gray-500">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
