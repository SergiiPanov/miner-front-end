import React, { useEffect } from "react";
import { push } from "connected-react-router";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../Containers/Auth/store/selectors";
import moment from "moment";
import { RoutePath } from "../routers/constants";
import { actions } from "../Containers/Auth/store";

export default (ComposedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(getAuth());
    useEffect(() => {
      if (!isAuthenticated) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const decode = jwtDecode(token);
          const date = moment(new Date()).valueOf();
          if (decode.exp < date) {
            localStorage.removeItem("jwtToken");
            dispatch(push(RoutePath.SIGN_IN));
          } else {
            dispatch(actions.A_FetchUserSuccess(decode));
            dispatch(actions.A_SignInSuccess(token));
            localStorage.setItem("jwtToken", token);
          }
        } else {
          dispatch(push(RoutePath.SIGN_IN));
        }
      }
    }, [isAuthenticated, dispatch]);

    return isAuthenticated ? <ComposedComponent {...props} /> : null;
  };
};
