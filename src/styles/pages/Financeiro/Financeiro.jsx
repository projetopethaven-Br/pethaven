import { PaymentsRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Financeiro() {
  return (
    <ModulePlaceholder
      eyebrow="Gestão"
      title="Financeiro"
      description="Acompanhe recebimentos, serviços, pacotes e indicadores financeiros."
      icon={PaymentsRounded}
      actionLabel="Novo lançamento"
    />
  );
}
