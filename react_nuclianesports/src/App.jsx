import React from "react";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tournament from "./components/Tournaments/Tournament";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Matches from "./components/Matches/Matches";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Contact from "./components/Contact/Contact";
import Blog from "./components/Blog/Blog";
import WalletPage from "./components/Coins/WalletPage";
import Signup from "./components/Auth/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
