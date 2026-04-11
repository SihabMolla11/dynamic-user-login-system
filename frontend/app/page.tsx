'use client'

import Link from 'next/link';

const page = () => {
  return (
    <div>
      home page it's
      <nav className=" mx-auto flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-xl p-1.5 w-fit">
        <Link
          href="/registration"
          className="px-4 py-2 rounded-lg text-sm font-medium text-amber-700 border border-amber-300 bg-white"
        >
          Registration
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg text-sm font-medium text-amber-500 hover:bg-white hover:text-amber-700 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg text-sm font-medium text-amber-500 hover:bg-white hover:text-amber-700 transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default page;