import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/pages/Home/HomePage";
import { WordPage } from "../components/pages/Words/WordPage";
import { ProfilePage } from "../components/pages/Profile/ProfilePage";
import { GeneratorPage } from "../components/pages/Generator/GeneratorPage";
import { LecturaPage } from "../components/pages/Lecture/LecturaPage";
import { AnkiGamePage } from "../components/pages/AnkiGame/AnkiGamePage";
import { Statistics } from "../components/pages/Statistics/Statistics";
import { MatchGame } from "../components/pages/Labs/MatchGame";


const RouterP = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<MatchGame />} />
        <Route path="/words" element={<WordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/ankigame" element={<AnkiGamePage />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/lecture/:id" element={<LecturaPage />} />

        <Route path="*" element={<Navigate to="/?sequovs=true" replace />} />
      </Routes>
    </Router>
  );
};

export default RouterP;
