import { createRoot } from 'react-dom/client';
import './styles/index.css';  // ← IMPORTANTE!
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);