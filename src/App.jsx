import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from './components/Layout/Applayout';
import Home from './components/Pages/Home';
import RegisterPage from './components/Pages/RegisterPage';
import LoginPage from './components/Pages/LoginPage';
import AuthProvider from '../src/context/AuthContext'; // ✅ Import here
import ProfilePage from "./components/Pages/ProfilePage";
import About from "./components/Pages/About";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        {path:'/about',element:<About/>},
        { path: "/register", element: <RegisterPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/profile", element: <ProfilePage /> }, // ✅ Added
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
