import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./components/Layout/Layout";
import LoadingScreen from "./components/shared/LoadingScreen";
import { setCredentials, clearCredentials } from "./globalState/slices/auth";

// Lazy load components for better performance
const Home = React.lazy(() => import("./components/Home/Home"));
const Tournament = React.lazy(() =>
  import("./components/Tournaments/Tournament")
);
const Leaderboard = React.lazy(() =>
  import("./components/Leaderboard/Leaderboard")
);
const Matches = React.lazy(() => import("./components/Matches/Matches"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const WalletPage = React.lazy(() => import("./components/Coins/WalletPage"));
const Signup = React.lazy(() => import("./components/Auth/Signup"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const TournamentDetails = React.lazy(() =>
  import("./components/TournamentDetails/TournamentDetails")
);
const PaymentPage = React.lazy(() =>
  import("./components/Payments/PaymentPage")
);
const PaymentSuccess = React.lazy(() =>
  import("./components/Payments/PaymentSuccess")
);
const UnderDevelopment = React.lazy(() =>
  import("./components/shared/UnderDevelopment")
);


const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  React.useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/users/profile", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("User data fetched:", response.data.data);
        dispatch(setCredentials({ user: response.data.data }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(clearCredentials());
      });
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <React.Suspense fallback={<LoadingScreen />}>
          <Layout />
        </React.Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tournaments",
          element: <Tournament />,
        },
        {
          path: "/tournaments/:id",
          element: <TournamentDetails />,
        },
        {
          path: "/leaderboard",
          element: <UnderDevelopment />,
        },
        {
          path: "/matches",
          element: <UnderDevelopment />,
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
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/payment",
          element: <PaymentPage />,
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
