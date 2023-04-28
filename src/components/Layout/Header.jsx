import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/store/slices/usersSlice";
import { signOut } from "next-auth/react";

const Header = () => {
  console.log("rendering header");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { user, isLoading } = useSelector((state) => state.userAuth);

  // console.log(user?.avatar?.url);
  const handleSignOut = () => {
    signOut();
  };
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
        {!isLoading && user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle ">
              <div className="rounded-full">
                {/* <AiOutlineUser color="white" /> */}
                <Image
                  src={`${user?.avatar?.url}`}
                  alt="profile"
                  fill
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/me/update">
                  <div className="justify-between">
                    <div>Profile</div>
                    <span className="badge">New</span>
                  </div>
                </Link>
              </li>
              <li>
                <a>My Bookings</a>
              </li>
              <li className="text-red-500">
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          !isLoading && (
            <div className="bg-[#a45332] px-4 py-2 rounded-lg text-white">
              <Link href="/login">Login</Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
