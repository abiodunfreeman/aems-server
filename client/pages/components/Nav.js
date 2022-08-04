import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="flex flex-col p-8 gap-4">
      <Link href="/">
        <p className="text-red-400">Home</p>
      </Link>
      <Link href="/items/all">
        <p className="text-blue-400">view items</p>
      </Link>
    </nav>
  );
}
