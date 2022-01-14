import { NextPage } from 'next';
import Link from 'next/link';

const Nav: NextPage = () => {
  return(
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-blue-600 no-underline">Teach Other</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <Link href="/profile">
              <a className="bg-blue-600 border-l-2 border-2 px-4 rounded-lg hover:bg-blue-400 transition duration-200">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="bg-blue-600 border-l-2 border-2 px-4 rounded-lg hover:bg-blue-400 transition duration-200">Search</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}

export default Nav;