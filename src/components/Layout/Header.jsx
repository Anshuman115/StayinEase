import React from "react";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
const Header = () => {
  return (
    <div className="navbar mx-auto my-0 bg-[#391f14] ">
      <div className="flex-1">
        <a className="normal-case text-2xl md:pl-[100px] text-white">Stayin</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white cormorant ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Bookings</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <div className="rounded-full">
              <AiOutlineUser color="white" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
