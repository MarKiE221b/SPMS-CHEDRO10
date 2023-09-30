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
import Terms from "./pages/Terms.jsx";
import Application from "./pages/Application.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";


function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedLayout = () =>{
    return(
      <>
        <Navbar />
        <div className="flex items-center justify-center border h-[70vh] md:min-h-screen border-gray-200 rounded-lg shadow-lg m-7 p-7">
          <Outlet />
        </div>
        <Footer />
      </>
    )
  }

  const Layout = () =>{
    return(
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen m-4">
          <Outlet />
        </div>
        <Footer />
      </>
    )
  }
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    return children;
  }

  
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      ),
      children:[
        {
          path: "/auth/users/:id",
          element: <Users />
        }
      ]
    },
    
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />
        },
        
        {
          path: "/needtoknow",
          element: <NeedToKnow />
        },
        {
          path: "/forget",
          element: <Forget />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/terms",
          element: <Terms />
        },
        {
          path: "/application",
          element: <Application />
        },
        
      ]
    },
    
    {
      path: "*",
      element: <Page404 />
    }
    
    
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}


export default App
