import { HashRouter, Routes, Route } from 'react-router-dom';

import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header/Header';
import AllCatsPage from './pages/AllCatsPage';
import FavoriteCatsPage from './pages/favoriteCatsPage';

export default function App() {
  return (
    <HashRouter>
      <FavoritesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<AllCatsPage />} />
          <Route path="/favorites" element={<FavoriteCatsPage />} />
        </Routes>
      </FavoritesProvider>
    </HashRouter>
  );
}
