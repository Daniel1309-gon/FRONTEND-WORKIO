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
import AddHotel from "./pages/AddCoworking";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyCoworkings";
import EditHotel from "./pages/EditCoworking";
import Search from "./pages/Search";
import RecoverPassword from "./pages/RecoverPassword";
import ResetPassword from "./pages/ResetPassword";
import DetailPage from "./pages/DetailPage";
import MyBookings from "./pages/MyBookings";

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
        <Route
          path="/coworkings/:idsede"
          element={
            <Layout>
              <DetailPage />
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
              path="/my-coworkings/get-coworking/:idsede"
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
            <Route
              path="/bookings"
              element={
                <Layout>
                  <MyBookings />
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
