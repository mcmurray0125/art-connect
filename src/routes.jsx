import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AuthWrapper from "./pages/AuthWrapper";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AboutMe from "./components/profile/AboutMe";

// Components
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

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
    path: '/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
