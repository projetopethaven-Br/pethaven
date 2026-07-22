import MercadoDetalhe from "./pages/MercadoDetalhe/MercadoDetalhe";
import Mercado from "./pages/Mercado/Mercado";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pets from "./pages/Pets/Pets";
import Tutors from "./pages/Tutors/Tutors";
import Checkin from "./pages/Checkin/Checkin";
import Agenda from "./pages/Agenda/Agenda";
import Financeiro from "./pages/Financeiro/Financeiro";
import Relatorios from "./pages/Relatorios/Relatorios";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import Mensagens from "./pages/Mensagens/Mensagens";
import Notificacoes from "./pages/Notificacoes/Notificacoes";
import Pesquisa from "./pages/Pesquisa/Pesquisa";

import DashboardLayout from "./layouts/DashboardLayout";

function PrivatePage({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivatePage>
            <Dashboard />
          </PrivatePage>
        }
      />

      <Route
        path="/pets"
        element={
          <PrivatePage>
            <Pets />
          </PrivatePage>
        }
      />

      <Route
        path="/tutores"
        element={
          <PrivatePage>
            <Tutors />
          </PrivatePage>
        }
      />

      <Route
        path="/checkin"
        element={
          <PrivatePage>
            <Checkin />
          </PrivatePage>
        }
      />

      <Route
        path="/agenda"
        element={
          <PrivatePage>
            <Agenda />
          </PrivatePage>
        }
      />

      <Route
        path="/financeiro"
        element={
          <PrivatePage>
            <Financeiro />
          </PrivatePage>
        }
      />

      <Route
        path="/relatorios"
        element={
          <PrivatePage>
            <Relatorios />
          </PrivatePage>
        }
      />

      <Route
        path="/configuracoes"
        element={
          <PrivatePage>
            <Configuracoes />
          </PrivatePage>
        }
      />

      <Route
        path="/mensagens"
        element={
          <PrivatePage>
            <Mensagens />
          </PrivatePage>
        }
      />

      <Route
        path="/notificacoes"
        element={
          <PrivatePage>
            <Notificacoes />
          </PrivatePage>
        }
      />

           <Route
        path="/pesquisa"
        element={
          <PrivatePage>
            <Pesquisa />
          </PrivatePage>
        }
      />

      <Route
        path="/mercado"
        element={
          <PrivatePage>
            <Mercado />
          </PrivatePage>
        }
      />
      <Route
  path="/mercado/:id"
  element={
    <PrivatePage>
      <MercadoDetalhe />
    </PrivatePage>
  }
/>

      <Route
        path="/pesquisa-publica"
        element={<Pesquisa publicMode />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}