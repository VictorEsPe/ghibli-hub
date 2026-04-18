import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="bg-gray-800 text-slate-300 p-4 mb-8">
      <Link to="/">
        <h1 className="text-xl">Studio Ghibli Hub</h1>
      </Link>
    </nav>
  );
}
