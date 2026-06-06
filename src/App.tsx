import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NovelList from "@/pages/NovelList";
import NovelReader from "@/pages/NovelReader";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel" element={<NovelList />} />
        <Route path="/novel/:chapterId" element={<NovelReader />} />
      </Routes>
      <PWAInstallPrompt />
    </Router>
  );
}
