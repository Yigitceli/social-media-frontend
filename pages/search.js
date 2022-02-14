import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../components/Feed";
import Layout from "../components/Layout";
import PageLoading from "../components/PageLoading";
import withAuth from "../services/useAuth";

function Search({ data }) {
 
  const { isLoading } = useSelector((state) => state.pins);
 

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
export default withAuth(Search);
