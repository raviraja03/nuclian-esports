import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Layout from "./components/Layout/Layout";
import LoadingScreen from "./components/shared/LoadingScreen";

// Lazy load components for better performance
const Home = React.lazy(() => import("./components/Home/Home"));
const Tournament = React.lazy(() => import("./components/Tournaments/Tournament"));
const Leaderboard = React.lazy(() => import("./components/Leaderboard/Leaderboard"));
const Matches = React.lazy(() => import("./components/Matches/Matches"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const WalletPage = React.lazy(() => import("./components/Coins/WalletPage"));
const Signup = React.lazy(() => import("./components/Auth/Signup"));


const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <React.Suspense fallback={<LoadingScreen />}><Layout /></React.Suspense>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "/tournaments",
          element: <Tournament />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
        {
          path: "/matches",
          element: <Matches />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/walletpage",
          element: <WalletPage />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;