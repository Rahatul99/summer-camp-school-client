import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import ErrorPage from "../ErrorPage";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/CLasses/Classes";
import SignUp from "../Pages/SignUp/SignUp";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'signUp',
            element: <SignUp />
        },
        {
            path: 'instructors',
            element: <Instructors />
        },
        {
            path: 'classes',
            element: <Classes />
        }
      ]
    },
  ]);