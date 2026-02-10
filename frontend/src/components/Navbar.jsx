import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left side - Brand */}
      <div className="flex-1 flex items-center gap-2">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          GoldenBear
        </Link>
        {/* External Website Button */}
        <a
          href="https://goldenbear.com" // ✅ replace with your actual site
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          Website
        </a>
      </div>

      {/* Center - Menu (hidden on mobile) */}
      <div className="flex-none hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/transaction">Transactions</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
