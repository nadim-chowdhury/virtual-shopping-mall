import Link from "next/link";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Virtual Mall
          </Link>
        </nav>
      </header>
      <main className="container mx-auto py-6">{children}</main>
      <footer className="bg-gray-800 text-white p-4 mt-6">
        <p className="text-center">&copy; 2024 Virtual Mall</p>
      </footer>
    </div>
  );
}
