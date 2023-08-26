import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Landing";
import Login from "./pages/Login";
import NeedToKnow from "./pages/NeedToKnow";
import Forget from "./pages/Forget";
import Page404 from "./pages/Page404";
import Users from "./pages/Users";

const Layout = () =>{
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/forget",
      element: <Forget />
    },
    {
      path: "/needtoknow",
      element: <NeedToKnow />
    },
    {
      path: "/users/:id",
      element: <Users />
    }
    ]
  },
  {
    path: "*",
    element: <Page404 />
  }


]);

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}


export default App
