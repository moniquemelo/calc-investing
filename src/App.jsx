import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PoliticaDePrivacidade from './pages/PoliticaPrivacidade';
import ArticleDetail from './pages/ArticleDetail';



export default function App() {
  return(
    <Router>
      <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/:slug/:id" element={<ArticleDetail />} />
        </Routes>
        <CookieBanner />
    </Router>
  );
}

