import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AuthWrapper from "./pages/AuthWrapper";
import Register from "./pages/Register";
import AboutMe from "./components/profile/AboutMe";

// Components
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        name: 'Home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/:userId',
        name: 'Profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'about-me',
            element: <AboutMe />,
          },
        ],
      },
      {
        path: '/settings',
        name: 'Settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
