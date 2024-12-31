import Link from "next/link";

export default function NavItem({ mobile }: { mobile?: boolean }) {
  return (
    <ul
      className={`text-md justify-center flex gap-4 w-full items-center ${
        mobile && "flex-col h-full"
      }`}
    >
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/course">Course</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/challenges">Challenges</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/news">News</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/faq">FAQ</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <Link href="/roadmap">Roadmap</Link>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <button>Sign in</button>
      </li>
      <li className="py-2 text-center border-b-2 cursor-pointer">
        <button>Sign out</button>
      </li>
    </ul>
  );
}
