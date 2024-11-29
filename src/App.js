import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/CMS/Home/Home";
import Navbar from "./pages/Layout/Navbar/Navbar";
import Register from "./pages/Auth/Sign-Up/Register";
import Login from "./pages/Auth/Sign-In/Login";
import { toast } from "react-toastify";
import FriendsPage from "./pages/CMS/Friend/Friend";
import Profile from "./pages/CMS/Profile/Profile";

function App() {
  // Custom hook to detect current route path

  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      toast("Please log in to access this page");
      return <Navigate to="/" />;
    }
    return (
      <>
        {/* Only show Navbar for private routes */}
        <Navbar />
        {children}
      </>
    );
  }

  const PublicRouteNames = [
    {
      path: "/",
      Component: <Login />,
    },
    {
      path: "/register",
      Component: <Register />,
    },
  ];

  const PrivateRouteNames = [
    {
      path: "/home",
      Component: <Home />,
    },
    {
      path: "/profile",
      Component: <Profile />,
    },
    {
      path: "/friends",
      Component: <FriendsPage />,
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {PublicRouteNames.map((route, index) => (
            <Route path={route.path} element={route.Component} key={index} />
          ))}
          {PrivateRouteNames.map((route, index) => (
            <Route
              path={route.path}
              element={<PrivateRoute>{route.Component}</PrivateRoute>}
              key={index}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
