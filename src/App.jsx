import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router";
import { AuthenticationContext } from "./components/AuthenticationContext";
import PrivateRoute from "./pages/login/PrivateRoute";
import { LoginPage } from "./pages/login/LoginPage";
import { Bookmarks } from "./components/Bookmarks/Bookmarks";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { Saved } from "./components/Saved/Saved";
import Friends from "./pages/friends/Friends";

function App() {
  return (
    <AuthenticationContext>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="profile/friends"
          element={
            <PrivateRoute>
              <Friends />
            </PrivateRoute>
          }
        />
        <Route
          path="bookmarks"
          element={
            <PrivateRoute>
              <Bookmarks />
            </PrivateRoute>
          }
        />
        <Route
          path="saved"
          element={
            <PrivateRoute>
              <Saved />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthenticationContext>
  );
}

export default App;
