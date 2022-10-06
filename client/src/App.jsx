
import {Routes , Route} from "react-router-dom"
import {useSelector} from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor/ApplyDoctor";
import Notifications from "./pages/Notifications/Notifications";
import DoctorList from "./pages/Admin/DoctorList";
import UserList from "./pages/Admin/UserList";

function App() {

  const loading = useSelector(state => state.loading.loading);

  return (
    <>
      {loading && <div className="spinner-parent">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      
      <Toaster position="top-center"/>
      <Routes>
        <Route 
          path = "/login"
          element = {
            <PublicRoute>
              <Login/>
            </PublicRoute>
        }
        />
        <Route
          path = "/register"
          element = {
            <PublicRoute>
              <Register/>
            </PublicRoute>
        }
        />
        <Route
          path = "/"
          element = {
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/apply-doctor"
          element = {
            <ProtectedRoute>
              <ApplyDoctor/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/notifications"
          element = {
            <ProtectedRoute>
              <Notifications/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/admin/doctors-list"
          element = {
            <ProtectedRoute>
                <DoctorList/>
            </ProtectedRoute>
          }
        />
        <Route
          path = "/admin/users-list"
          element = {
            <ProtectedRoute>
                <UserList/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
