import "./Topbar.css";

import {
  AddRounded,
  MailRounded,
  NotificationsRounded,
  SearchRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="topbar">
      <form className="topbar-search" onSubmit={handleSearchSubmit}>
        <SearchRounded />
        <input
          type="search"
          placeholder="Pesquisar pet, tutor, hospedagem..."
          aria-label="Pesquisar no PetHaven"
        />
      </form>

      <div className="topbar-actions">
        <button
          type="button"
          className="topbar-primary-action"
          onClick={() => navigate("/checkin")}
        >
          <AddRounded />
          <span>Novo Check-in</span>
        </button>

        <button
          type="button"
          className="topbar-icon-action"
          onClick={() => navigate("/mensagens")}
          aria-label="Abrir mensagens"
          title="Mensagens"
        >
          <MailRounded />
          <span>2</span>
        </button>

        <button
          type="button"
          className="topbar-icon-action"
          onClick={() => navigate("/notificacoes")}
          aria-label="Abrir notificações"
          title="Notificações"
        >
          <NotificationsRounded />
          <span>5</span>
        </button>

        <button
          type="button"
          className="topbar-profile"
          onClick={() => navigate("/configuracoes")}
        >
          <span className="topbar-profile__avatar">R</span>

          <span className="topbar-profile__copy">
            <strong>Renato</strong>
            <small>Administrador</small>
          </span>

          <KeyboardArrowDownRounded />
        </button>
      </div>
    </div>
  );
}
