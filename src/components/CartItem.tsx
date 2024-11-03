import Image from "next/image";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartItem({
  name,
  price,
  quantity,
  image,
}: CartItemProps) {
  return (
    <div className="flex items-center border-b py-4">
      <Image
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500">
          ${price.toFixed(2)} x {quantity}
        </p>
      </div>
    </div>
  );
}
