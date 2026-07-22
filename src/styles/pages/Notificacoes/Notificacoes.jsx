import { NotificationsRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Notificacoes() {
  return (
    <ModulePlaceholder
      eyebrow="Atividades"
      title="Notificações"
      description="Acompanhe alertas operacionais, vacinas, medicações e atividades recentes."
      icon={NotificationsRounded}
    />
  );
}
