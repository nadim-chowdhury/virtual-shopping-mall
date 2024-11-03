"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
}

const fetchStores = async (): Promise<Store[]> => {
  const res = await fetch("/api/stores");
  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }
  return res.json();
};

export default function StoreListPage() {
  const [stores, setStores] = useState<Store[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (error) {
        console.log("getStores ~ error:", error);
        setError("Failed to load stores.");
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Browse Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores?.map((store) => (
          <Link
            key={store.id}
            href={`/store/${store.id}`}
            className="block border rounded-lg p-4 hover:shadow-lg"
          >
            <Image
              src={store.image}
              alt={store.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p className="text-gray-500">{store.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
