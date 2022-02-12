import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Feed from "../../components/Feed";
import PageLoading from "../../components/PageLoading";
import { AiOutlineLogout } from "react-icons/ai";
import ProfilLayout from "../../components/ProfilLayout";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { auth } from "../../firebaseconfig";
import { signOut } from "firebase/auth";
import withAuth from "../../services/useAuth";
import { fetchProfileData } from "../../redux/profileSlice";

const active = "font-bold bg-redColor text-white p-2 px-4 rounded-full";
const disActive = "font-bold bg-white text-black p-2 px-4 rounded-full";

const UserId = () => {
  const { user, saved, pins, isLoading, isError } = useSelector(
    (state) => state.profile
  );
  const [isActive, setIsActive] = useState(true);
  const Router = useRouter();
  const dispatch = useDispatch();
  const { userId } = Router.query;

  useEffect(async () => {
    if (userId) dispatch(fetchProfileData(userId));
  }, [userId]);

  const logOutHandler = () => {
    dispatch(logout());
    signOut(auth).then(() => {
      window.location.assign("https://www.google.com/accounts/Logout");
    });
  };

  return (
    <ProfilLayout>
      <div className="">
        {isLoading ? (
          <PageLoading message="Getting User Data..." />
        ) : (
          <div className="flex flex-col relative">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <button
              onClick={logOutHandler}
              className="top-3 right-5 bg-white rounded-full bg-white p-2 absolute"
            >
              <AiOutlineLogout color="red" />
            </button>

            <div className="w-full flex items-center flex-col gap-5 -my-10">
              <img src={user?.photoUrl} className="w-20 rounded-full" />
              <h3 className="font-bold text-3xl">{user?.displayName}</h3>
              <div className="flex gap-3">
                <button
                  className={isActive ? active : disActive}
                  onClick={() => setIsActive(true)}
                >
                  Created
                </button>
                <button
                  className={!isActive ? active : disActive}
                  onClick={() => setIsActive(false)}
                >
                  Saved
                </button>
              </div>

              <div>
                {isActive ? (
                  <Feed user={user} data={pins} />
                ) : (
                  <Feed user={user} data={saved} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfilLayout>
  );
};

export default withAuth(UserId);
