import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="flex  gap-5  ">
      <Link href="/">
        <p className="text-red-400 cursor-pointer">Home</p>
      </Link>
      <Link href="/category">
        <p className="text-gray-400 cursor-pointer">view categories</p>
      </Link>
      <Link href="/user/signup">
        <p className="text-orange-400 cursor-pointer">sign up</p>
      </Link>
      <Link href="/item/all">
        <p className="text-blue-400 cursor-pointer">view items</p>
      </Link>
      <Link href="/item/new">
        <p className="cursor-pointer text-purple-400">new item</p>
      </Link>
    </nav>
  );
}
