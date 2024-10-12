import Sidebar from "./components/Sidebar";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Items from "./components/Items";
import AddItem from "./components/AddItem";
import UpdateItem from "./components/UpdateItem";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ItemDetails from "./components/ItemDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { path: "/", element: <Items /> },
        { path: "/add", element: <AddItem /> },
        { path: "/update/:id", element: <UpdateItem /> },
        { path: "/details/:id", element: <ItemDetails /> },

      ],
    },
    {path: "/signin", element: <Signin/>},
    {path: "/signup", element: <Signup/>},
  ]);

  return <RouterProvider router={router} />;
}

export default App;
