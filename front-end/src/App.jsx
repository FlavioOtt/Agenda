// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AgendamentoPage from './components/Agendamento/AgendamentoPage';
import MeusAgendamentosPage from './components/Agendamento/MeusAgendamentosPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agendamento" element={<AgendamentoPage />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;