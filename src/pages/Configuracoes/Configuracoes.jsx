import { SettingsRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Configuracoes() {
  return (
    <ModulePlaceholder
      eyebrow="Administração"
      title="Configurações"
      description="Gerencie dados da empresa, usuários, permissões e preferências do sistema."
      icon={SettingsRounded}
    />
  );
}
