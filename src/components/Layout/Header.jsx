import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/store/slices/usersSlice";
import { signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  console.log("rendering header");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());

    const handleResize = () => {
      // Close menu on large screens
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user, isLoading } = useSelector((state) => state.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // console.log(user?.avatar?.url);
  const handleSignOut = () => {
    signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar mx-auto my-0 bg-[#391f14] font-semibold cormorant">
      <div className="flex-1">
        <a className="normal-case text-xl md:text-2xl lg:text-3xl pl-[20px] md:pl-[100px] text-white">
          StayinEase
        </a>
      </div>
      <GiHamburgerMenu
        className="md:hidden mr-2 text-[#a45332] text-2xl"
        onClick={toggleMenu}
      />
      <div className={`flex-none ${isMenuOpen ? "flex" : "hidden"} md:flex`}>
        <ul
          className={`menu px-1 flex text-white cormorant items-center ${
            isMenuOpen
              ? "menu-vertical absolute top-12 right-0 bg-[#391f14] z-10 rounded-lg p-1"
              : "menu-horizontal"
          }`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <Link href="/bookings/me">Bookings</Link>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li>
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
                    {user.role === "admin" && (
                      <>
                        <Link href="/admin/rooms">
                          <div className="justify-between">
                            <div>All Rooms </div>
                          </div>
                        </Link>
                      </>
                    )}
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
