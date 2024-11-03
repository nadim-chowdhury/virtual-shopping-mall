import Image from "next/image";

interface WishlistItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function WishlistItem({
  id,
  name,
  price,
  image,
}: WishlistItemProps) {
  return (
    <div className="border p-4 rounded-lg hover:shadow-lg">
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-500">${price.toFixed(2)}</p>
      <a
        href={`/product/${id}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        View Details
      </a>
    </div>
  );
}
