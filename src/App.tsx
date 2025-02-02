import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import LayoutB from "./layouts/LayoutB";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import SignIn from "./pages/SignIn";
import HomePage from "./components/HomePage";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import RecoverPassword from "./pages/RecoverPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutB>
              <HomePage />
            </LayoutB>
          }
        />
        <Route
          path="/search"
          element={
            <LayoutB>
              <Search />
            </LayoutB>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/registeradmin"
          element={
            <Layout>
              <RegisterAdmin />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/recover-password"
          element={
            <Layout>
              <RecoverPassword />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-coworking"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-coworking/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-coworkings"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
