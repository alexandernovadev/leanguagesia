import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../components/pages/Home/HomePage";
import { WordPage } from "../components/pages/Words/WordPage";
import { ProfilePage } from "../components/pages/Profile/ProfilePage";
import { GeneratorPage } from "../components/pages/Generator/GeneratorPage";

const RouterP = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/word" element={<WordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/generator" element={<GeneratorPage />} />

        {/* Ruta de captura para redirigir a la página de inicio */}
        <Route path="*" element={<Navigate to="/?sequovs=true" replace />} />
      </Routes>
    </Router>
  );
};

export default RouterP;
