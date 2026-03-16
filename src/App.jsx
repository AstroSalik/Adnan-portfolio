import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { ToastProvider } from './hooks/useToast'; 
import { storage } from './hooks/useLocalStorage';
import LoadingFallback from './components/layout/LoadingFallback';

// Lazy load Portfolio (Main Page)
const Portfolio = lazy(() => import('./PortfolioRoute'));

// Lazy load Admin Components
const ProtectedRoute = lazy(() => import('./admin/auth/ProtectedRoute'));
const PassphraseGate = lazy(() => import('./admin/auth/PassphraseGate'));
const AdminRoot = lazy(() => import('./admin/AdminRoot'));

// Lazy load 404
const NotFound = lazy(() => import('./components/pages/NotFound'));

function App() {
  useEffect(() => {
    try {
      storage.initialize();
    } catch (error) {
      console.error('Failed to initialize storage:', error);
    }
  }, []);

  return (
    <ToastProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Portfolio Route */}
            <Route path="/" element={<Portfolio />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<PassphraseGate onUnlock={() => {
              sessionStorage.setItem('adnan_auth', 'true');
              window.location.href = '/admin';
            }} />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/*" element={<AdminRoot />} />
            </Route>

            {/* 404 Handling */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ToastProvider>
  );
}

export default App;
