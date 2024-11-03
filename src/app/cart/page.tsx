"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const fetchCartItems = async (): Promise<CartItem[]> => {
  const res = await fetch("/api/cart");
  if (!res.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return res.json();
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.log("getCartItems ~ error:", error);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-4">
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Total: ${total.toFixed(2)}</h2>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
