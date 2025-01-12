import { createBrowserRouter } from "react-router-dom";

// Layouts
import General from "./layouts/General";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";
import AboutMe from "./components/profile/AboutMe";

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
        children: [
          {
            path: "about-me",
            element: <AboutMe />,
          },
        ],
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
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
  },
]

const router = createBrowserRouter(routes);

export { routes, router };
