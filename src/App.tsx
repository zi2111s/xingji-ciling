import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Books from "@/pages/Books";
import Study from "@/pages/Study";
import History from "@/pages/History";
import Profile from "@/pages/Profile";
import NovelList from "@/pages/NovelList";
import NovelReader from "@/pages/NovelReader";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="study/:chapterId" element={<Study />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/novel" element={<NovelList />} />
        <Route path="/novel/:chapterId" element={<NovelReader />} />
      </Routes>
      <PWAInstallPrompt />
    </Router>
  );
}
