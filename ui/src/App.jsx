import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import GalleryPage from "./pages/GalleryPage";
import EventsPage from "./pages/EventsPage";
import ContactPage from "./pages/ContactPage";
import BecomeMemberPage from "./pages/BecomeMemberPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;