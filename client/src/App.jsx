import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const FreeTournamentSuccess = React.lazy(() =>
  import("./components/Payments/FreeTournamentSuccess")
);
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
import Auth from "./Auth";
import { useFetchProfileQuery } from "./globalState/api/authApi";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const { data: profile, isError } = useFetchProfileQuery();
  React.useEffect(() => {
    if (profile) {
      dispatch(setCredentials({ user: profile.data }));
      dispatch({ type: "socket/connect" });
    } else if (isError) {
      dispatch(clearCredentials());
    }
  }, [profile, isError, dispatch]);
  const protectedRoutes = [
    { path: "profile", element: <Profile /> },
    { path: "payment", element: <PaymentPage /> },
    { path: "payment-success", element: <PaymentSuccess /> },
    { path: "matches", element: <Matches /> },
    { path: "free-tournament-success", element: <FreeTournamentSuccess /> },
  ];

  const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "tournaments", element: <Tournament /> },
    { path: "tournaments/:id", element: <TournamentDetails /> },
    { path: "leaderboard", element: <UnderDevelopment /> },
    { path: "blog", element: <Blog /> },
    { path: "walletpage", element: <WalletPage /> },
    { path: "contact", element: <Contact /> },
    { path: "forgot-password", element: <ForgotPassword /> },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <React.Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 🔒 Protected routes */}
              {protectedRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Auth user={user}>{element}</Auth>}
                />
              ))}

              {/* 🌐 Public routes */}
              {publicRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    path === "login" || path === "signup" ? (
                      <Auth user={user} onlyPublic redirect="/">
                        {element}
                      </Auth>
                    ) : (
                      element
                    )
                  }
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};

export default App;
