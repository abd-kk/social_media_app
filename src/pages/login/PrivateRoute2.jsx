/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Auth } from "../../components/AuthenticationContext";
import { Navigate } from "react-router";

// This private route to prevent the user from accessing the login page if he is logged in

export const PrivateRoute2 = ({ children }) => {
  const { isLoggedIn } = useContext(Auth);
  const h = isLoggedIn();
  return <>{h ? <Navigate to="/" /> : children}</>;
};
