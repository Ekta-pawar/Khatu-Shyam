import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Janmashtami from './pages/Janmashtami';
import Membership from './pages/Membership';
import MasikKirtan from './pages/MasikKirtan';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BecomeAMember from './pages/BecomeAMember';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/janmashtami"    element={<Janmashtami />} />
          <Route path="/membership"     element={<Membership />} />
          <Route path="/masik-kirtan"   element={<MasikKirtan />} />
          <Route path="/gallery"        element={<Gallery />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/become-a-member" element={<BecomeAMember />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
