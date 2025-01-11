import { createBrowserRouter } from "react-router-dom";

// Layouts
import General from "./layouts/General";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";

const routes = [
  {
    path: "/",
    routeName: "general",
    element: <General />,
    children: [
      {
        path: "/",
        name: "Home",
        element: <Home />,
      },
      {
        path: "/:userId",
        name: "Profile",
        element: <Profile />,
      },
      {
        path: "/register",
        name: "Register",
        element: <Register />,
      },
      //Protected Routes
      {
        path: "/settings",
        name: "Settings",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Settings />,
          },
        ],
      },
    ],
  }
]

const router = createBrowserRouter(routes);

export { routes, router };
