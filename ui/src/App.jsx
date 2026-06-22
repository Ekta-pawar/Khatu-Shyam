import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import GalleryPage from "./pages/GalleryPage";
import VideosPage from "./pages/VideosPage";
import AlbumPage from "./pages/AlbumPage";
import MembersPage from "./pages/MembersPage";
import EventsPage from "./pages/EventsPage";
import ContactPage from "./pages/ContactPage";
import BecomeMemberPage from "./pages/BecomeMemberPage";
import MissionVisionPage from "./pages/MissionVisionPage";
import SponsorPage from "./pages/SponsorPage";

import { store } from "./admin/app/store";
import AuthInitializer from "./admin/components/AuthInitializer";
import AdminRoutes from "./admin/routes/AdminRoutes";
import MemberDetailsPage from "./pages/TeamMemberPage";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/team" element={<TeamPage />} />

          <Route
            path="/team/:memberId"
            element={<TeamMemberPage />}
          />
<Route path="/team/:id" element={<MemberDetailsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/videos" element={<VideosPage />} />
          <Route path="/gallery/Photos" element={<AlbumPage />} />

          <Route path="/events" element={<EventsPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/become-member"
            element={<BecomeMemberPage />}
          />

          <Route path="/mission-vision" element={<MissionVisionPage />} />

          <Route path="/Sponsor" element={<SponsorPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AuthInitializer>
                <AdminRoutes />
              </AuthInitializer>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;