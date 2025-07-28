export default async function Nav() {
    return (
      <nav className="flex items-center justify-between bg-black text-white p-4 mb-8">
        <a href="/excuse" className="text-2xl font-bold">
          Excuse Page
        </a>
        <ul className="flex space-x-8 text-xl">
          <li>
            <a href="/home" className="hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="/history" className="hover:text-gray-400">History</a>
          </li>
          <li>
            <a href="/stats" className="hover:text-gray-400">Stats</a>
          </li>
        </ul>
      </nav>
    )
}