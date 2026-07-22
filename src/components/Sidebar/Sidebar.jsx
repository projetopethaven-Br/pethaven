import "./Sidebar.css";

import {
  DashboardRounded,
  PetsRounded,
  PeopleRounded,
  HotelRounded,
  CalendarMonthRounded,
  PaymentsRounded,
  BarChartRounded,
  SettingsRounded,
  LogoutRounded,
  CampaignRounded,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../Logo/Logo";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: DashboardRounded },
  { label: "Pets", path: "/pets", icon: PetsRounded },
  { label: "Tutores", path: "/tutores", icon: PeopleRounded },
  { label: "Hospedagens", path: "/checkin", icon: HotelRounded },
  { label: "Agenda", path: "/agenda", icon: CalendarMonthRounded },
  { label: "Financeiro", path: "/financeiro", icon: PaymentsRounded },
  { label: "Relatórios", path: "/relatorios", icon: BarChartRounded },
 { label: "Mercado", path: "/mercado", icon: CampaignRounded },
  { label: "Configurações", path: "/configuracoes", icon: SettingsRounded },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="sidebar">
      <button
        type="button"
        className="sidebar-brand"
        onClick={() => navigate("/dashboard")}
        aria-label="Ir para o Dashboard"
      >
        <Logo width={174} />
        <span>Gestão inteligente para negócios pet</span>
      </button>

      <nav className="sidebar-navigation" aria-label="Menu principal">
        <span className="sidebar-section-title">Operação</span>

        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " sidebar-link--active" : ""}`
            }
          >
            <span className="sidebar-link__icon">
              <Icon />
            </span>
            <span className="sidebar-link__label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-profile"
          onClick={() => navigate("/configuracoes")}
        >
          <span className="sidebar-profile__avatar">R</span>

          <span className="sidebar-profile__copy">
            <strong>Renato</strong>
            <small>Administrador</small>
          </span>
        </button>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
          aria-label="Sair do sistema"
          title="Sair"
        >
          <LogoutRounded />
        </button>
      </div>
    </div>
  );
}
