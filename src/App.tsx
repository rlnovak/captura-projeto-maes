import { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import SalesPage from './pages/SalesPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'sales'>('landing');

  const navigateToSales = () => {
    setCurrentPage('sales');
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToSales={navigateToSales} />
      ) : (
        <SalesPage onNavigateToLanding={navigateToLanding} />
      )}
    </div>
  );
}

export default App;
