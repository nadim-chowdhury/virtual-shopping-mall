import Image from "next/image";

interface StoreProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function StoreCard({
  id,
  name,
  description,
  image,
}: StoreProps) {
  return (
    <div className="border p-4 rounded-lg hover:shadow-lg">
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-500">{description}</p>
      <a
        href={`/store/${id}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        Visit Store
      </a>
    </div>
  );
}
