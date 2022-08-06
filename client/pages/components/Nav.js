import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="flex flex-col p-8 gap-4">
      <Link href="/">
        <p className="text-red-400">Home</p>
      </Link>
      <Link href="/item/all">
        <p className="text-blue-400">view items</p>
      </Link>
      <Link href="/item/Laptop">
        <p className="text-blue-400">view laptops</p>
      </Link>
      <Link href="/item/Desktop">
        <p className="text-blue-400">view desktops</p>
      </Link>
    </nav>
  );
}
