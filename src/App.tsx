import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { ServicesPage } from './pages/ServicesPage';
import { OnlinePrayerPage } from './pages/OnlinePrayerPage';
import { PrayerRequestPage } from './pages/PrayerRequestPage';
import { GalleryPage } from './pages/GalleryPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/ministries" element={<MinistriesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/online-prayer" element={<OnlinePrayerPage />} />
            <Route path="/prayer-request" element={<PrayerRequestPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Fallback 404 Route */}
            <Route
              path="*"
              element={
                <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
                  <h1 className="font-serif text-3xl font-bold text-slate-900">Page Not Found</h1>
                  <p className="text-xs text-slate-600">The page you are looking for does not exist or has moved.</p>
                  <a
                    href="/"
                    className="inline-block px-5 py-2 rounded-full bg-church-primary text-white text-xs font-semibold"
                  >
                    Return to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
