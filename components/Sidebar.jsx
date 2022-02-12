import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";

const active =
  " duration-200 ml-5 ease-in-out capitalize transition-all flex items-center gap-3 cursor-pointer font-bold text-black border-r-2 border-black hover:text-black";
const disActive =
  " duration-200 ml-5 ease-in-out capitalize flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black transition-all";

export default function Sidebar() {
  const user = useSelector((state) => state.user?.data);
  const Router = useRouter();

  return (
    <div className="bg-white flex justify-between h-screen shadow-md flex-col min-w-210">
      <div className="flex flex-col">
        <img className="gap-2 my-7 mx-5" src="/logo.png" width={150} />

        <div className="flex flex-col gap-5">
          <Link href="/">
            <div className={Router.pathname == "/" ? active : disActive}>
              <RiHomeFill />
              <p className="bold ">Home</p>
            </div>
          </Link>
          <p className="ml-5 md:text-lg">Discover Categories</p>
          {categories.map((item) => {
            return (
              <Link href={`/category/${item.name}`}>
                <div
                  className={
                    Router.query.slug == item.name ? active : disActive
                  }
                >
                  <img
                    src={item.image}
                    className="w-8 h-8 object rounded-full overflow-hidden"
                  />

                  <p className="bold ">
                    {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="my-4 mx-3 flex items-center">
        {user && (
          <Link href={`user/${user.uid}`}>
            <div className="flex gap-2 items-center cursor-pointer shadow-md w-full rounded-lg p-2">
              <img
                src={user.photoURL}
                alt="profil-photo"
                className="rounded-full w-10 h-10"
              />
              <p>{user.displayName}</p>
              <IoIosArrowForward />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
