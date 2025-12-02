import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WatermarkLayer from "./components/WatermarkLayer";

import HomePage from "./pages/HomePage";
import FormelsamlingPage from "./pages/FormelsamlingPage";
import IdeaBankPage from "./pages/IdeaBankPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

import Dashboard from "./admin/Dashboard";
import CustomersPage from "./admin/CustomersPage";
import LicensesPage from "./admin/LicensesPage";
import MessagesPage from "./admin/MessagesPage";
import StatsPage from "./admin/StatsPage";

// NYE sider
import KjopsvilkarPage from "./pages/KjopsvilkarPage";
import BrukervilkarPage from "./pages/BrukervilkarPage";
import PersonvernPage from "./pages/PersonvernPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-shell">
        <WatermarkLayer />
        <Header />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/produkter/formelsamling"
              element={<FormelsamlingPage />}
            />
            <Route path="/idebank" element={<IdeaBankPage />} />
            <Route path="/om" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />

            {/* Juridiske sider */}
            <Route path="/kjopsvilkar" element={<KjopsvilkarPage />} />
            <Route path="/brukervilkar" element={<BrukervilkarPage />} />
            <Route path="/personvern" element={<PersonvernPage />} />

            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/kunder" element={<CustomersPage />} />
            <Route path="/admin/lisenser" element={<LicensesPage />} />
            <Route path="/admin/meldinger" element={<MessagesPage />} />
            <Route path="/admin/statistikk" element={<StatsPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
