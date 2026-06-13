import './App.css';
import LandingPage from './pages/LandingPage';

// Página de captura autônoma. Objetivo único: converter visitante em lead.
// A página de vendas vive em projeto separado e recebe tráfego qualificado
// (e-mail, retargeting, conteúdo) — não é mais linkada a partir daqui.
function App() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <LandingPage />
    </div>
  );
}

export default App;
