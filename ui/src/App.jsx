import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import GalleryPage from "./pages/GalleryPage";
import EventsPage from "./pages/EventsPage";
import ContactPage from "./pages/ContactPage";
import BecomeMemberPage from "./pages/BecomeMemberPage";
import MissionVisionPage from "./pages/MissionVisionPage";
import SponsorPage from "./pages/SponsorPage";

import { store } from "./admin/app/store";
import AuthInitializer from "./admin/components/AuthInitializer";
import AdminRoutes from "./admin/routes/AdminRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3500 }}
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

          <Route path="/gallery" element={<GalleryPage />} />

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