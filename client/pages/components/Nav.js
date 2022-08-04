export default function Nav() {
  return (
    <nav className="flex flex-col p-8 gap-4">
      <a href="/" className="text-red-400">
        Home
      </a>
      <a href="/items/all" className="text-blue-400">
        View Items
      </a>
    </nav>
  );
}
