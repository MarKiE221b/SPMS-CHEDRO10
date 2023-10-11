import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Homepage from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import NeedToKnow from "./pages/NeedToKnow.jsx";
import Forget from "./pages/Forget.jsx";
import Page404 from "./pages/Page404.jsx";
import Users from "./pages/Users.jsx";
import Admin from "./pages/CHED_ADMIN/Admin.jsx";
import Terms from "./pages/Terms.jsx";
import Application from "./pages/Application.jsx";
import { selectDuration } from "./redux/durationSlice.js";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/authSlice.js";

function App() {
  const duration = useSelector(selectDuration);
  const auth = useSelector(selectAuth);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen m-4">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  const ProtectedApplication = ({ children }) => {
    if (!duration) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const ProtectedAuth = ({ children }) => {
    if (!auth) {
      console.log(auth);
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <ProtectedAuth>
          <Outlet />
        </ProtectedAuth>
      ),

      children: [
        {
          path: "/auth/user",
          element: <Users />,
        },
        {
          path: "/auth/admin",
          element: <Admin />,
        },
      ],
    },

    {
      path: "/h",
      element: (
        <ProtectedApplication>
          <Layout />
        </ProtectedApplication>
      ),
      children: [
        {
          path: "/h/needtoknow",
          element: <NeedToKnow />,
        },
        {
          path: "/h/terms",
          element: <Terms />,
        },
        {
          path: "/h/application",
          element: <Application />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },

        {
          path: "/forget",
          element: <Forget />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
