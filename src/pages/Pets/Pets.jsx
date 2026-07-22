import { useMemo, useState } from "react";
import {
  AddRounded,
  CalendarMonthRounded,
  CloseRounded,
  FilterAltRounded,
  MedicalServicesRounded,
  MoreHorizRounded,
  PetsRounded,
  SearchRounded,
  ShieldRounded,
  VisibilityRounded,
} from "@mui/icons-material";

import "./Pets.css";

const initialPets = [
  {
    id: 1,
    name: "Thor",
    species: "Cão",
    breed: "Labrador Retriever",
    age: "4 anos",
    sex: "Macho",
    weight: "31 Kg",
    size: "Grande",
    chip: "985121004578965",
    tutor: "Carlos Mendes",
    phone: "(45) 99912-8040",
    status: "Hospedado",
    vaccine: "Em dia",
    color: "Dourado",
    initials: "TH",
    photo: "",
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    breed: "Persa",
    age: "2 anos",
    sex: "Fêmea",
    weight: "4 Kg",
    size: "Pequeno",
    chip: "985121004578111",
    tutor: "Fernanda Lima",
    phone: "(45) 99841-2267",
    status: "Banho",
    vaccine: "Em dia",
    color: "Branco",
    initials: "LU",
    photo: "",
  },
  {
    id: 3,
    name: "Mel",
    species: "Cão",
    breed: "Shih-tzu",
    age: "5 anos",
    sex: "Fêmea",
    weight: "7 Kg",
    size: "Pequeno",
    chip: "985121004578222",
    tutor: "Roberto Alves",
    phone: "(45) 99105-7844",
    status: "Creche",
    vaccine: "Vence em 12 dias",
    color: "Caramelo",
    initials: "ME",
    photo: "",
  },
  {
    id: 4,
    name: "Bella",
    species: "Cão",
    breed: "Poodle",
    age: "3 anos",
    sex: "Fêmea",
    weight: "8 Kg",
    size: "Pequeno",
    chip: "985121004578333",
    tutor: "Luciana Prado",
    phone: "(45) 99703-5109",
    status: "Alta hoje",
    vaccine: "Em dia",
    color: "Preto",
    initials: "BE",
    photo: "",
  },
  {
    id: 5,
    name: "Nina",
    species: "Gato",
    breed: "Siamês",
    age: "1 ano",
    sex: "Fêmea",
    weight: "3 Kg",
    size: "Pequeno",
    chip: "985121004578444",
    tutor: "Marina Costa",
    phone: "(45) 99611-3488",
    status: "Em casa",
    vaccine: "Vencida",
    color: "Creme",
    initials: "NI",
    photo: "",
  },
  {
    id: 6,
    name: "Fred",
    species: "Cão",
    breed: "Golden Retriever",
    age: "6 anos",
    sex: "Macho",
    weight: "36 Kg",
    size: "Grande",
    chip: "985121004578555",
    tutor: "Paulo Ribeiro",
    phone: "(45) 99217-6650",
    status: "Hospedado",
    vaccine: "Em dia",
    color: "Dourado",
    initials: "FR",
    photo: "",
  },
];
const emptyForm = {
  name: "",
  species: "Cão",
  breed: "",
  age: "",
  tutor: "",
  phone: "",
  status: "Em casa",
  vaccine: "Em dia",
  color: "",
};

function statusClass(status) {
  return status
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function Pets() {
  const [pets, setPets] = useState(initialPets);
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [viewMode, setViewMode] = useState("cards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredPets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return pets.filter((pet) => {
      const matchesQuery =
        !normalizedQuery ||
        [pet.name, pet.breed, pet.tutor, pet.phone]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesSpecies =
        species === "Todos" || pet.species === species;

      const matchesStatus =
        status === "Todos" || pet.status === status;

      return matchesQuery && matchesSpecies && matchesStatus;
    });
  }, [pets, query, species, status]);

  const stats = useMemo(() => {
    return {
      total: pets.length,
      hosted: pets.filter((pet) => pet.status === "Hospedado").length,
      daycare: pets.filter((pet) => pet.status === "Creche").length,
      vaccineAlerts: pets.filter((pet) => pet.vaccine !== "Em dia").length,
    };
  }, [pets]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const initials = form.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    setPets((current) => [
      {
        id: Date.now(),
        ...form,
        initials: initials || "PET",
      },
      ...current,
    ]);

    setForm(emptyForm);
    setIsModalOpen(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyForm);
  }

  return (
    <section className="pets-page">
      <header className="pets-page__header">
        <div>
          <span className="pets-page__eyebrow">Cadastros</span>
          <h1>Pets</h1>
          <p>
            Centralize dados, saúde, tutor e histórico operacional de cada pet.
          </p>
        </div>

        <button
          type="button"
          className="pets-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <AddRounded />
          Cadastrar pet
        </button>
      </header>

      <div className="pets-stats">
        <article className="pets-stat-card">
          <span className="pets-stat-card__icon pets-stat-card__icon--blue">
            <PetsRounded />
          </span>
          <div>
            <small>Total de pets</small>
            <strong>{stats.total}</strong>
            <span>Base cadastrada</span>
          </div>
        </article>

        <article className="pets-stat-card">
          <span className="pets-stat-card__icon pets-stat-card__icon--violet">
            <ShieldRounded />
          </span>
          <div>
            <small>Hospedados</small>
            <strong>{stats.hosted}</strong>
            <span>Agora no hotel</span>
          </div>
        </article>

        <article className="pets-stat-card">
          <span className="pets-stat-card__icon pets-stat-card__icon--green">
            <CalendarMonthRounded />
          </span>
          <div>
            <small>Na creche</small>
            <strong>{stats.daycare}</strong>
            <span>Atendimento ativo</span>
          </div>
        </article>

        <article className="pets-stat-card">
          <span className="pets-stat-card__icon pets-stat-card__icon--orange">
            <MedicalServicesRounded />
          </span>
          <div>
            <small>Alertas de vacina</small>
            <strong>{stats.vaccineAlerts}</strong>
            <span>Exigem atenção</span>
          </div>
        </article>
      </div>

      <section className="pets-panel">
        <div className="pets-toolbar">
          <label className="pets-search">
            <SearchRounded />
            <input
              type="search"
              placeholder="Pesquisar pet, tutor, raça ou telefone..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="pets-filters">
            <span className="pets-filter-label">
              <FilterAltRounded />
              Filtros
            </span>

            <select
              value={species}
              onChange={(event) => setSpecies(event.target.value)}
              aria-label="Filtrar por espécie"
            >
              <option>Todos</option>
              <option>Cão</option>
              <option>Gato</option>
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Filtrar por status"
            >
              <option>Todos</option>
              <option>Hospedado</option>
              <option>Creche</option>
              <option>Banho</option>
              <option>Alta hoje</option>
              <option>Em casa</option>
            </select>

            <div className="pets-view-switch">
              <button
                type="button"
                className={viewMode === "cards" ? "is-active" : ""}
                onClick={() => setViewMode("cards")}
              >
                Cards
              </button>
              <button
                type="button"
                className={viewMode === "table" ? "is-active" : ""}
                onClick={() => setViewMode("table")}
              >
                Lista
              </button>
            </div>
          </div>
        </div>

        <div className="pets-panel__summary">
          <strong>{filteredPets.length} pets encontrados</strong>
          <span>Os dados abaixo são demonstrativos para o desenvolvimento do módulo.</span>
        </div>

        {filteredPets.length === 0 ? (
          <div className="pets-empty">
            <PetsRounded />
            <h2>Nenhum pet encontrado</h2>
            <p>Altere os filtros ou cadastre um novo pet.</p>
          </div>
        ) : viewMode === "cards" ? (
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <article className="pet-card" key={pet.id}>
                <div className="pet-card__top">
                  <div className="pet-avatar">{pet.initials}</div>

                  <div className="pet-card__identity">
                    <h2>{pet.name}</h2>
                    <p>
                      {pet.species} • {pet.breed}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="pet-card__menu"
                    aria-label={`Mais opções para ${pet.name}`}
                  >
                    <MoreHorizRounded />
                  </button>
                </div>

                <div className="pet-card__tags">
                  <span className={`pet-status pet-status--${statusClass(pet.status)}`}>
                    {pet.status}
                  </span>
                  <span className="pet-age">{pet.age}</span>
                </div>

                <dl className="pet-card__details">
                  <div>
                    <dt>Tutor</dt>
                    <dd>{pet.tutor}</dd>
                  </div>
                  <div>
                    <dt>Telefone</dt>
                    <dd>{pet.phone}</dd>
                  </div>
                  <div>
                    <dt>Vacinação</dt>
                    <dd
                      className={
                        pet.vaccine === "Em dia"
                          ? "pet-vaccine pet-vaccine--ok"
                          : "pet-vaccine pet-vaccine--alert"
                      }
                    >
                      {pet.vaccine}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  className="pet-card__details-button"
                  onClick={() => setSelectedPet(pet)}
                >
                  <VisibilityRounded />
                  Ver ficha completa
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="pets-table-wrapper">
            <table className="pets-table">
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Espécie / raça</th>
                  <th>Tutor</th>
                  <th>Status</th>
                  <th>Vacinação</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredPets.map((pet) => (
                  <tr key={pet.id}>
                    <td>
                      <div className="pets-table__pet">
                        <span>{pet.initials}</span>
                        <div>
                          <strong>{pet.name}</strong>
                          <small>{pet.age}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {pet.species} • {pet.breed}
                    </td>
                    <td>
                      <strong>{pet.tutor}</strong>
                      <small>{pet.phone}</small>
                    </td>
                    <td>
                      <span className={`pet-status pet-status--${statusClass(pet.status)}`}>
                        {pet.status}
                      </span>
                    </td>
                    <td>{pet.vaccine}</td>
                    <td>
                      <button
                        type="button"
                        className="pets-table__action"
                        onClick={() => setSelectedPet(pet)}
                      >
                        Ver ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="pets-modal-backdrop" role="presentation">
          <div
            className="pets-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-pet-title"
          >
            <div className="pets-modal__header">
              <div>
                <span>Novo cadastro</span>
                <h2 id="new-pet-title">Cadastrar pet</h2>
              </div>

              <button type="button" onClick={closeModal} aria-label="Fechar cadastro">
                <CloseRounded />
              </button>
            </div>

            <form className="pets-form" onSubmit={handleSubmit}>
              <div className="pets-form__grid">
                <label>
                  Nome do pet
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Ex.: Thor"
                  />
                </label>

                <label>
                  Espécie
                  <select
                    name="species"
                    value={form.species}
                    onChange={handleInputChange}
                  >
                    <option>Cão</option>
                    <option>Gato</option>
                    <option>Outro</option>
                  </select>
                </label>

                <label>
                  Raça
                  <input
                    required
                    name="breed"
                    value={form.breed}
                    onChange={handleInputChange}
                    placeholder="Ex.: Labrador"
                  />
                </label>

                <label>
                  Idade
                  <input
                    required
                    name="age"
                    value={form.age}
                    onChange={handleInputChange}
                    placeholder="Ex.: 4 anos"
                  />
                </label>

                <label>
                  Cor
                  <input
                    name="color"
                    value={form.color}
                    onChange={handleInputChange}
                    placeholder="Ex.: Dourado"
                  />
                </label>

                <label>
                  Situação atual
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option>Em casa</option>
                    <option>Hospedado</option>
                    <option>Creche</option>
                    <option>Banho</option>
                    <option>Alta hoje</option>
                  </select>
                </label>

                <label>
                  Tutor
                  <input
                    required
                    name="tutor"
                    value={form.tutor}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                  />
                </label>

                <label>
                  Telefone
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                  />
                </label>

                <label className="pets-form__full">
                  Situação da vacinação
                  <select
                    name="vaccine"
                    value={form.vaccine}
                    onChange={handleInputChange}
                  >
                    <option>Em dia</option>
                    <option>Vence em 12 dias</option>
                    <option>Vencida</option>
                  </select>
                </label>
              </div>

              <div className="pets-form__actions">
                <button type="button" className="pets-secondary-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="pets-primary-button">
                  Salvar pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPet && (
        <div className="pets-modal-backdrop" role="presentation">
          <div
            className="pets-modal pets-modal--profile"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pet-profile-title"
          >
            <div className="pets-modal__header">
              <div>
                <span>Ficha do pet</span>
                <h2 id="pet-profile-title">{selectedPet.name}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPet(null)}
                aria-label="Fechar ficha"
              >
                <CloseRounded />
              </button>
            </div>

            <div className="pet-profile">
              <div className="pet-profile__hero">
                <div className="pet-profile__avatar">{selectedPet.initials}</div>
                <div>
                  <h3>{selectedPet.name}</h3>
                  <p>
                    {selectedPet.species} • {selectedPet.breed} • {selectedPet.age}
                  </p>
                  <span className={`pet-status pet-status--${statusClass(selectedPet.status)}`}>
                    {selectedPet.status}
                  </span>
                </div>
              </div>

              <div className="pet-profile__sections">
                <article>
                  <h4>Identificação</h4>
                  <p><strong>Cor:</strong> {selectedPet.color || "Não informada"}</p>
                  <p><strong>Vacinação:</strong> {selectedPet.vaccine}</p>
                </article>

                <article>
                  <h4>Tutor responsável</h4>
                  <p><strong>Nome:</strong> {selectedPet.tutor}</p>
                  <p><strong>Telefone:</strong> {selectedPet.phone}</p>
                </article>

                <article>
                  <h4>Saúde e cuidados</h4>
                  <p>Alergias, medicamentos, alimentação e observações serão conectados nesta ficha.</p>
                </article>

                <article>
                  <h4>Histórico</h4>
                  <p>Hospedagens, check-ins, serviços e ocorrências serão exibidos aqui.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
