import { BarChartRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Relatorios() {
  return (
    <ModulePlaceholder
      eyebrow="Inteligência"
      title="Relatórios"
      description="Transforme a operação em indicadores claros para apoiar suas decisões."
      icon={BarChartRounded}
      actionLabel="Gerar relatório"
    />
  );
}
