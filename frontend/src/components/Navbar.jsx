import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left side - Brand */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">GoldenBear</a>
      </div>

      {/* Center - Menu (hidden on mobile) */}
      <div className="flex-none hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Transactions</a>
          </li>
          <li>
            <a>Reports</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
