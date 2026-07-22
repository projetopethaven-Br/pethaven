import "./Dashboard.css";
import {
  PetsRounded, HotelRounded, EventAvailableRounded, VaccinesRounded,
  MedicationRounded, WarningAmberRounded, ArrowForwardRounded,
  CheckCircleRounded, ScheduleRounded, InsightsRounded, CampaignRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const metrics = [
  { label: "Check-ins previstos", value: "8", note: "3 aguardando pré-check-in", icon: EventAvailableRounded, tone: "blue" },
  { label: "Pets hospedados", value: "27", note: "81% da capacidade", icon: HotelRounded, tone: "green" },
  { label: "Vacinas pendentes", value: "2", note: "Revisar antes da entrada", icon: VaccinesRounded, tone: "orange" },
  { label: "Medicações hoje", value: "6", note: "2 próximas do horário", icon: MedicationRounded, tone: "purple" },
];

const preCheckins = [
  { pet: "Thor", tutor: "Carlos Henrique", horario: "08:30", status: "Completo", tone: "success" },
  { pet: "Luna", tutor: "Fernanda Souza", horario: "10:00", status: "Aguardando tutor", tone: "warning" },
  { pet: "Mel", tutor: "Roberto Lima", horario: "13:30", status: "Em validação", tone: "info" },
  { pet: "Bob", tutor: "Luciana Alves", horario: "16:00", status: "Pendente", tone: "danger" },
];

const alerts = [
  { title: "Vacina da Luna vence em 4 dias", text: "Solicite um comprovante atualizado antes da próxima hospedagem." },
  { title: "Medicação do Thor às 14:00", text: "1 comprimido após a alimentação, conforme orientação do tutor." },
  { title: "Pré-check-in de Bob incompleto", text: "Faltam as fotos laterais e a autorização de hospedagem." },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">Visão operacional</span>
          <h1>Bom dia, Renato 👋</h1>
          <p>Acompanhe os check-ins, pendências e cuidados programados para hoje.</p>
        </div>
        <button className="dashboard-hero__button" onClick={() => navigate('/checkin')}>
          Novo check-in <ArrowForwardRounded />
        </button>
      </section>

      <section className="metrics-grid">
        {metrics.map(({ label, value, note, icon: Icon, tone }) => (
          <article className="metric-card" key={label}>
            <div className={`metric-card__icon metric-card__icon--${tone}`}><Icon /></div>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="dashboard-main-grid">
        <article className="panel panel--wide">
          <div className="panel__header">
            <div><span className="panel__eyebrow">Fluxo do dia</span><h2>Pré-check-ins de hoje</h2></div>
            <button onClick={() => navigate('/checkin')}>Ver todos <ArrowForwardRounded /></button>
          </div>
          <div className="precheckin-list">
            {preCheckins.map((item) => (
              <div className="precheckin-row" key={item.pet}>
                <div className="pet-badge">{item.pet.charAt(0)}</div>
                <div className="precheckin-row__identity"><strong>{item.pet}</strong><span>{item.tutor}</span></div>
                <div className="precheckin-row__time"><ScheduleRounded /><span>{item.horario}</span></div>
                <span className={`status-pill status-pill--${item.tone}`}>{item.status}</span>
                <button className="icon-button" aria-label={`Abrir ${item.pet}`}><ArrowForwardRounded /></button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel occupancy-card">
          <div className="panel__header"><div><span className="panel__eyebrow">Capacidade</span><h2>Ocupação</h2></div></div>
          <div className="occupancy-ring"><div><strong>81%</strong><span>27 de 33 vagas</span></div></div>
          <div className="occupancy-legend"><span><i className="legend-dot legend-dot--hotel" />Hotel 18</span><span><i className="legend-dot legend-dot--daycare" />Creche 9</span></div>
        </article>

        <article className="panel">
          <div className="panel__header"><div><span className="panel__eyebrow">Atenção</span><h2>Pendências</h2></div></div>
          <div className="alerts-list">
            {alerts.map((alert) => <div className="alert-row" key={alert.title}><span><WarningAmberRounded /></span><div><strong>{alert.title}</strong><p>{alert.text}</p></div></div>)}
          </div>
        </article>

        <article className="panel research-card">
          <div className="research-card__icon"><InsightsRounded /></div>
          <span className="panel__eyebrow">Pesquisa nacional</span>
          <h2>Ajude a construir o futuro da gestão pet</h2>
          <p>Participe do diagnóstico nacional para hotéis e creches pet e contribua com as próximas decisões do PetHaven.</p>
          <div className="research-card__features"><span><CheckCircleRounded /> Resposta em poucos minutos</span><span><CheckCircleRounded /> Convite para parceiros beta</span></div>
          <button onClick={() => navigate('/pesquisa')}>Acessar questionário <CampaignRounded /></button>
        </article>
      </section>
    </div>
  );
}
