"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Store {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

const fetchStoreData = async (storeId: string): Promise<Store> => {
  const res = await fetch(`/api/stores/${storeId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch store data");
  }
  return res.json();
};

export default function StorePage() {
  const router = useRouter();
  const { storeId } = router.query;

  const [storeData, setStoreData] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) return; // Wait until storeId is defined

    const getStoreData = async () => {
      try {
        const data = await fetchStoreData(storeId as string);
        setStoreData(data);
      } catch (error) {
        console.log("getStoreData ~ error:", error);
        setError("Failed to load store data.");
      } finally {
        setLoading(false);
      }
    };

    getStoreData();
  }, [storeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{storeData?.name}</h1>
      <p className="mb-4">{storeData?.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {storeData?.products.map((product) => (
          <Link
            key={product.id}
            href={`/store/${storeId}/product/${product.id}`}
            className="block border rounded-lg p-4 hover:shadow-lg"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-500">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
