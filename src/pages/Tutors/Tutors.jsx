import { PeopleRounded } from "@mui/icons-material";
import ModulePlaceholder from "../../components/ModulePlaceholder/ModulePlaceholder";

export default function Tutors() {
  return (
    <ModulePlaceholder
      eyebrow="Relacionamento"
      title="Tutores"
      description="Centralize contatos, autorizações e vínculos entre tutores e seus pets."
      icon={PeopleRounded}
      actionLabel="Cadastrar tutor"
    />
  );
}
