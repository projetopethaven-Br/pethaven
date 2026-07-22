import { HotelRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Checkin() {
  return (
    <ModulePlaceholder
      eyebrow="Operação"
      title="Hospedagens e check-ins"
      description="Organize entradas, saídas, acomodações e orientações de cada hospedagem."
      icon={HotelRounded}
      actionLabel="Novo check-in"
    />
  );
}
