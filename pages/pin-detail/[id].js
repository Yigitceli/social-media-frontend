import axios from "../../axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { MdDownloadForOffline } from "react-icons/md";
import { makeComment } from "../../redux/pinsSlice";
import { hydrateData, reHydrate } from "../../redux/pinSlice";
import Link from "next/link";
import PageLoading from "../../components/PageLoading";
import withAuth from "../../services/useAuth";

function id() {
  const [comment, setComment] = useState("");
  const pin = useSelector((state) => state.pin.data);

  const user = useSelector((state) => state.user.data);
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (query.id) {
      const { data } = await axios.get(`pin/${query.id}`);
      setLoading(true);
      dispatch(hydrateData(data));
      setLoading(false);
    }
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(makeComment({ user, pinId: pin._id, comment }));
    setComment("");
  };

  return (
    <Layout>
      {loading ? (
        <PageLoading message="Getting Pin Details..." />
      ) : (
        <div className="px-5 py-3">
          {!loading ? (
            <div className="items-start flex flex-col gap-2 bg-white">
              <img
                src={pin.pinUrl}
                className="rounded-r-3xl rounded-l-3xl rounded-b-xl"
              />
              <div className="p-5 flex flex-col w-full gap-6">
                <div className="flex w-full justify-center items-center">
                  <a href={`${pin.pinUrl}`} download target="_blank">
                    <button className="rounded-full p-2 px-7 flex justify-center items-center bg-redColor">
                      <MdDownloadForOffline fontSize={20} />
                    </button>
                  </a>
                </div>
                <h3 className="font-bold text-3xl">{pin.title}</h3>
                <p>{pin.description}</p>
                <div className="flex gap-2 items-center">
                  <img
                    src={pin.postedBy.picture}
                    className="w-12 rounded-full"
                  />
                  <p className="text-md font-bold">{pin.postedBy.name}</p>
                </div>
                <div className="flex-col flex gap-6">
                  <h3 className="text-2xl">Comments</h3>
                  <form onSubmit={submitHandler} className="flex gap-2 w-full">
                    <img src={user.photoURL} className="w-12 rounded-full" />
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border-2 border-grey-400 rounded-2xl px-2 focus:outline-4"
                      placeholder="Add a comment"
                    />

                    <button
                      type="submit"
                      className="font-bold px-5 bg-redColor p-3 rounded-full text-white"
                    >
                      Done
                    </button>
                  </form>
                  <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                    {pin.comments
                      .slice()
                      .sort((f, s) => s.createdAt - f.createdAt)
                      .map((item) => {
                        return (
                          <div className="flex gap-3 items-center">
                            <img
                              className="rounded-full w-12"
                              src={item.postedBy.picture}
                            />
                            <p>{item.comment}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      )}
    </Layout>
  );
}

export default withAuth(id);
