import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use.auth.listener";
import UserContext from "./context/user";
// import ProtectedRoute from "./helpers/protected-routes";
// import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user } = useAuthListener() ?? { user: undefined };

  return (
<UserContext.Provider value={{ user }}>
  <Router>
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        
         <Route path={ROUTES.LOGIN} element={<Login />}/>
         <Route path={ROUTES.SIGN_UP} element={<Signup />}/>
         <Route path={ROUTES.PROFILE} element={<Profile />}/>
         <Route path={ROUTES.DASHBOARD} element={<Dashboard />}/>
         <Route path="*" element={<NotFound />} />
         
      </Routes>
    </Suspense>
  </Router>
</UserContext.Provider>
  )
}


{/* <Route 
         path={ROUTES.LOGIN}
         element={
         <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} navigate={Navigate}>
          <Login />
          </IsUserLoggedIn>} />
        <Route 
        path={ROUTES.SIGN_UP} 
        element={
        <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} navigate={Navigate}>
          <Signup />
          </IsUserLoggedIn>} />

        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
          <ProtectedRoute user={user} navigate={Navigate}>
            <Dashboard />
           </ProtectedRoute>}
        />

        <Route path="*" element={<NotFound />} /> */}