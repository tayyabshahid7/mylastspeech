import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Route,RouteProps, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
    component: React.ElementType;
    // any additional vars
  }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ exact,component: Component, path, ...rest }) => {
    const loggedIn = localStorage.getItem("userToken");
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn && loggedIn?.length>0 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
        }}
      />
    );
  };