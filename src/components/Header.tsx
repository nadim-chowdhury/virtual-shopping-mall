import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Virtual Mall</h1>
        <nav>
          <Link href="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link href="/cart" className="mr-4 hover:underline">
            Cart
          </Link>
          <Link href="/wishlist" className="mr-4 hover:underline">
            Wishlist
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
