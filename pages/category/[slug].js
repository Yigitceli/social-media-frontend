import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../../components/Feed";
import Layout from "../../components/Layout";
import { fetchPins } from "../../redux/pinsSlice";
import withAuth from "../../services/useAuth";

import PageLoading from "../../components/PageLoading";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  const dispatch = useDispatch();
  const { slug } = Router.query;
  const { data, isLoading } = useSelector((state) => state.pins);
  useEffect(() => {
    if (slug) {
      dispatch(fetchPins({ slug }));
    }
  }, [Router]);

  return (
    <Layout>
      {isLoading ? (
        <PageLoading message="Getting Pins..." />
      ) : (
        <Feed data={data} />
      )}
    </Layout>
  );
};

export default withAuth(Category);
