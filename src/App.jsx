import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationProvider';
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));

function App() {
  return (
    <NavigationProvider>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </NavigationProvider>
  );
}

export default App;
