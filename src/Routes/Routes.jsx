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
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";



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
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      children:[
        {
          path: 'myCart',
          element: <MyCart />
        },
        {
          path: 'payment',
          element: <Payment />
        },
        {
          path: 'allUsers',
          element: <AdminRoute><AllUsers /></AdminRoute>
        },
        {
          path: 'addClass',
          element: <InstructorRoute><AddClass /></InstructorRoute>
        },
        {
          path: 'myClasses',
          element: <InstructorRoute><MyClasses /></InstructorRoute>
        },
        {
          path: 'manageClasses',
          element: <AdminRoute><ManageClasses /></AdminRoute>
        }
      ]
    }
  ]);