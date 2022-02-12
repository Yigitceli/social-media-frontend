import { useRouter } from "next/router";
import { useSelector } from "react-redux";


const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { data } = useSelector((state) => state.user);
    const Router = useRouter();

    // If user is not logged in, return login component
    if (!data && Router.pathname !== "/login") {
      Router.replace("/login");
      return null;
    }

    // If user is logged in, return original component
    if (data && Router.pathname == "/login") {
      Router.replace("/");
      return null;
    }

    return <Component {...props} />;
  };
  return Auth;
  // Copy getInitial props so it will run as well
};

export default withAuth;
