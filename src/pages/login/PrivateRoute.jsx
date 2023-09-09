/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useContext } from "react";
import { Auth } from "../../components/AuthenticationContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Auth);
  const h = isLoggedIn();
  return <>{h ? children : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
