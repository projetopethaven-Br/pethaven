import { CalendarMonthRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Agenda() {
  return (
    <ModulePlaceholder
      eyebrow="Planejamento"
      title="Agenda"
      description="Visualize compromissos, serviços, entradas e saídas em uma única agenda."
      icon={CalendarMonthRounded}
      actionLabel="Novo compromisso"
    />
  );
}
