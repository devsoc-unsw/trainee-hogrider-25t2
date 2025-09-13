import Link from "next/link";

export default function Nav() {
  return (
    <nav className="mb-8 flex items-center justify-between bg-black p-4 text-white">
      <Link href="/excuse" className="text-2xl font-bold ml-3">
        I'M LATE!
      </Link>
      <ul className="flex space-x-8 text-xl">
        <li>
          <Link href="/" className="hover:text-gray-400">
            HOME
          </Link>
        </li>
        <li>
          <Link href="/history" className="hover:text-gray-400">
            HISTORY
          </Link>
        </li>
        <li>
          <Link href="/stats" className="hover:text-gray-400">
            STATS
          </Link>
        </li>
      </ul>
    </nav>
  );
}
