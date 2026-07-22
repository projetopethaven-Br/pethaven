import { MailRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Mensagens() {
  return (
    <ModulePlaceholder
      eyebrow="Comunicação"
      title="Mensagens"
      description="Centralize as conversas da equipe e a comunicação com os tutores."
      icon={MailRounded}
      actionLabel="Nova mensagem"
    />
  );
}
