import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="flex  gap-5">
      <Link href="/">
        <p className="text-red-400 cursor-pointer">Home</p>
      </Link>
      <Link href="/category">
        <p className="text-gray-400 cursor-pointer">view categories</p>
      </Link>
      <Link href="/item/all">
        <p className="text-blue-400 cursor-pointer">view items</p>
      </Link>
      <Link href="/item/Laptop">
        <p className="text-green-400 cursor-pointer">view laptops</p>
      </Link>
      <Link href="/item/Desktop">
        <p className="text-purple-400 cursor-pointer">view desktops</p>
      </Link>
    </nav>
  );
}
