
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import User from "./components/getuser/User";
import Add from "./components/adduser/Add";
import Edit from "./components/updateuser/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; 
// Simulate auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Replace with your token validation logic
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures 'children' is a valid React node
};


// Layout for authenticated pages
const AuthenticatedLayout = () => {
  const navigate = useNavigate();

  // Logout function to remove token and redirect
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <h1>User Management App</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// Router Configuration
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <User /> },
      { path: "/add", element: <Add /> },
      { path: "/edit/:id", element: <Edit /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
