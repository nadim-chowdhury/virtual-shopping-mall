"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const fetchProductData = async (
  storeId: string,
  productId: string
): Promise<Product> => {
  const res = await fetch(`/api/stores/${storeId}/products/${productId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  return res.json();
};

export default function ProductPage() {
  const router = useRouter();
  const { storeId, productId } = router.query;

  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId || !productId) return; // Wait until both storeId and productId are defined

    const getProductData = async () => {
      try {
        const data = await fetchProductData(
          storeId as string,
          productId as string
        );
        setProductData(data);
      } catch (error) {
        console.log("getProductData ~ error:", error);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [storeId, productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Image
          src={productData!.image}
          alt={productData!.name}
          width={500}
          height={500}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{productData!.name}</h1>
          <p className="text-2xl text-gray-500 mb-4">
            ${productData!.price.toFixed(2)}
          </p>
          <p className="text-lg">{productData!.description}</p>
          <button className="bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
