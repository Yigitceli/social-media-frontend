import React from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { save, savePin } from "../redux/userSlice";
import { deletePin } from "../redux/pinsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

export default function Pin({ item, user }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isSaving } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    if (user?.saved.some((item2) => item._id == item2._id)) setSaved(true);
  }, [item, user]);

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    dispatch(savePin(item));
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    dispatch(deletePin(item));
  };

  return (
    <Link href={`/pin-detail/${item._id}`}>
      <div className="flex flex-col gap-1">
        <div
          className="relative z-0 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={!hovered ? "hidden" : `absolute w-full h-full`}>
            <a
              onClick={(e) => e.stopPropagation()}
              href={item.pinUrl}
              target="_blank"
              download
            >
              <div className="top-2 left-2 rounded-full bg-white absolute p-2 opacity-75 hover:opacity-100 flex items-center justify-center ">
                <MdDownloadForOffline fontSize={20} />
              </div>
            </a>

            {!saved ? (
              <button
                onClick={handleSaveClick}
                className="absolute top-2 right-2 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl"
              >
                {isSaving ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    width={25}
                    height={25}
                  />
                ) : (
                  "Save"
                )}
              </button>
            ) : (
              <button
                onClick={handleSaveClick}
                className="absolute top-2 right-2 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl"
              >
                Saved
              </button>
            )}
            <a
              href={`${item.destination}`}
              target={"_blank"}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-2 opacity-75 hover:opacity-100 left-2 bg-white flex items-center gap-1 p-2 rounded-full justfiy-evenly"
            >
              <BsFillArrowUpRightCircleFill />
              <p className="font-bold">{item.destination.slice(8, 16)}...</p>
            </a>
            {item.postedBy.uid == user?.uid && (
              <div
                onClick={handleDeleteClick}
                className="absolute bottom-2 right-2 bg-white opacity-75 hover:opacity-100 rounded-full p-2"
              >
                <AiTwotoneDelete />
              </div>
            )}
          </div>

          <img src={item.pinUrl} className="rounded-lg " />
        </div>
        <Link href={`/user/${item.postedBy.uid}`}>
          <button className="w-full flex gap-3 items-center relative">
            <img src={item.postedBy.picture} className="w-8 rounded-full" />
            <p className="font-bold">{item.postedBy.name}</p>
          </button>
        </Link>
      </div>
    </Link>
  );
}
