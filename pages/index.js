import Head from "next/head";
import Image from "next/image";
import Login from "./login";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import withAuth from "../services/useAuth";
import Feed from "../components/Feed";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hydrateData } from "../redux/pinsSlice";
import PageLoading from "../components/PageLoading";

function Home({ data }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.pins);

  useEffect(async () => {
    dispatch(hydrateData(data));
  }, []);

  return (
    <div>
      <Layout>
        {isLoading ? (
          <PageLoading message={"Getting pins data..."} />
        ) : (
          <Feed />
        )}
      </Layout>
    </div>
  );
}
export default withAuth(Home);

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get(
      "https://share-me-backend.herokuapp.com/api/pin"
    );
    return {
      props: { data: data.payload }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: { data: [] }, // will be passed to the page component as props
    };
  }
}
