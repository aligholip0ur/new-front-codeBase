import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  Component: React.ComponentType; // Type for React component passed as a prop
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

// A functional component for private routing
const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component, isAuthenticated }) => {
  // State to manage authentication status

  // Example useEffect for checking authentication (replace with actual logic)
  // useEffect(() => {
  //   // Your authentication logic or API call here
  //   const checkAuth = async () => {
  //     // Simulate an authentication check
  //     const authStatus = await fakeAuthCheck(); // Replace with real auth check
  //     setIsAuthenticated(authStatus);
  //   };

  //   checkAuth();
  // }, []);

  // Render Component if authenticated, otherwise redirect to login
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// Mock function for example (replace with your real authentication check)
// const fakeAuthCheck = async () => {
//   // Simulate a delay for the auth check
//   return new Promise<boolean>((resolve) =>
//     setTimeout(() => resolve(false), 500)
//   ); // Change `false` to `true` for testing
// };
