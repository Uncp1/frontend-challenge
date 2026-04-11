import { HashRouter, Routes, Route } from 'react-router-dom';

import { FavoritesProvider } from './context/FavoritesContext';
import { CatsProvider } from './context/CatsContext';
import Header from './components/Header/Header';
import AllCatsPage from './pages/AllCatsPage';
import FavoriteCatsPage from './pages/FavoriteCatsPage';

export default function App() {
  return (
    <HashRouter>
      <CatsProvider>
        <FavoritesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<AllCatsPage />} />
            <Route path="/favorites" element={<FavoriteCatsPage />} />
          </Routes>
        </FavoritesProvider>
      </CatsProvider>
    </HashRouter>
  );
}
