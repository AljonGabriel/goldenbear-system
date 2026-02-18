import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left side - Brand */}
      <div className="flex-1 flex items-center gap-2">
        <Link to="/home" className="normal-case text-xl text-yellow-500">
          GoldenBear System
        </Link>
      </div>

      {/* Center - Menu (hidden on mobile) */}
      <div className="flex-none hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/transaction">Transactions</Link>
          </li>
          <li>
            <Link to="/barcode">Generate Barcodes</Link>
          </li>

          {/* Divider before Go to Website */}
          <li className="divider lg:divider-horizontal"></li>

          <li>
            <Link to="/website">Go to Website</Link>
          </li>
          <li>
            <Link to="/product">Add Products</Link>
          </li>

          {/* Divider before Go to Website */}
          <li className="divider lg:divider-horizontal"></li>

          <li className="text-error">
            <Link to="/product">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
