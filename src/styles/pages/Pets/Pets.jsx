import { useMemo, useState } from "react";
import {
  AddPhotoAlternateRounded,
  AddRounded,
  ArrowBackRounded,
  CalendarMonthRounded,
  CloseRounded,
  ContactEmergencyRounded,
  EditRounded,
  HomeRounded,
  MedicalServicesRounded,
  PetsRounded,
  PhotoCameraRounded,
  SearchRounded,
  ShieldRounded,
} from "@mui/icons-material";
import "./Pets.css";

const tutors = [
  { id: 1, name: "Carlos Mendes", phone: "(45) 99912-8040", email: "carlos@email.com", address: "Rua Paraná, 245", city: "Cascavel/PR", emergencyName: "Mariana Mendes", emergencyRelation: "Esposa", emergencyPhone: "(45) 99820-1120", vet: "Dra. Ana Paula • Clínica VetMais", vetPhone: "(45) 3038-2211" },
  { id: 2, name: "Fernanda Lima", phone: "(45) 99841-2267", email: "fernanda@email.com", address: "Av. Brasil, 1210", city: "Cascavel/PR", emergencyName: "João Lima", emergencyRelation: "Irmão", emergencyPhone: "(45) 99944-7012", vet: "Dr. Marcelo • AnimalCare", vetPhone: "(45) 3225-7733" },
  { id: 3, name: "Roberto Alves", phone: "(45) 99105-7844", email: "roberto@email.com", address: "Rua das Flores, 88", city: "Toledo/PR", emergencyName: "Sônia Alves", emergencyRelation: "Esposa", emergencyPhone: "(45) 99701-2234", vet: "Dra. Camila • Vet Center", vetPhone: "(45) 3055-9090" },
];

const seedPets = [
  { id: 1, name: "Thor", species: "Cão", breed: "Labrador", age: "4 anos", sex: "Macho", tutorId: 1, status: "Hospedado", vaccine: "Em dia", color: "Dourado", observations: "Dócil, brincalhão e acostumado com outros cães.", mainPhoto: "", photos: {} },
  { id: 2, name: "Luna", species: "Gato", breed: "Persa", age: "2 anos", sex: "Fêmea", tutorId: 2, status: "Banho", vaccine: "Em dia", color: "Branco", observations: "Prefere ambientes calmos.", mainPhoto: "", photos: {} },
  { id: 3, name: "Mel", species: "Cão", breed: "Shih-tzu", age: "5 anos", sex: "Fêmea", tutorId: 3, status: "Creche", vaccine: "Vence em 12 dias", color: "Caramelo", observations: "Usa medicação às 18h.", mainPhoto: "", photos: {} },
];

const emptyForm = { name: "", species: "Cão", breed: "", age: "", sex: "Macho", tutorId: "", status: "Em casa", vaccine: "Em dia", color: "", observations: "", mainPhoto: "", photos: {} };
const photoFields = [["front", "Frente"], ["back", "Traseira"], ["left", "Lado esquerdo"], ["right", "Lado direito"]];

function readImage(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

export default function Pets() {
  const [pets, setPets] = useState(seedPets);
  const [query, setQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [tab, setTab] = useState("dados");

  const filteredPets = useMemo(() => pets.filter((pet) => {
    const tutor = tutors.find((item) => item.id === Number(pet.tutorId));
    return [pet.name, pet.breed, pet.species, tutor?.name].join(" ").toLowerCase().includes(query.toLowerCase());
  }), [pets, query]);

  const openNew = () => { setForm(emptyForm); setSelectedPet(null); setTab("dados"); setEditorOpen(true); };
  const openPet = (pet) => { setSelectedPet(pet); setForm({ ...emptyForm, ...pet }); setTab("dados"); setEditorOpen(true); };
  const closeEditor = () => { setEditorOpen(false); setSelectedPet(null); setForm(emptyForm); };
  const change = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const tutor = tutors.find((item) => item.id === Number(form.tutorId));

  function save(event) {
    event.preventDefault();
    if (!form.name || !form.breed || !form.tutorId) return;
    const payload = { ...form, tutorId: Number(form.tutorId), id: selectedPet?.id || Date.now() };
    setPets((current) => selectedPet ? current.map((pet) => pet.id === selectedPet.id ? payload : pet) : [payload, ...current]);
    closeEditor();
  }

  return (
    <section className="pets-page">
      <header className="pets-page__header">
        <div><span>Cadastros</span><h1>Pets</h1><p>Abra a ficha com duplo clique e mantenha dados, tutor, fotos e saúde em um só lugar.</p></div>
        <button className="pets-primary-button" onClick={openNew}><AddRounded /> Cadastrar pet</button>
      </header>

      <div className="pets-stats">
        <article><PetsRounded /><div><small>Total de pets</small><strong>{pets.length}</strong></div></article>
        <article><ShieldRounded /><div><small>Hospedados</small><strong>{pets.filter((p) => p.status === "Hospedado").length}</strong></div></article>
        <article><CalendarMonthRounded /><div><small>Na creche</small><strong>{pets.filter((p) => p.status === "Creche").length}</strong></div></article>
        <article><MedicalServicesRounded /><div><small>Alertas de vacina</small><strong>{pets.filter((p) => p.vaccine !== "Em dia").length}</strong></div></article>
      </div>

      <section className="pets-panel">
        <div className="pets-toolbar"><label><SearchRounded /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar pet, tutor ou raça..." /></label><span>{filteredPets.length} pets encontrados</span></div>
        <div className="pets-grid">
          {filteredPets.map((pet) => {
            const linkedTutor = tutors.find((item) => item.id === Number(pet.tutorId));
            return <article className="pet-card" key={pet.id} onDoubleClick={() => openPet(pet)} tabIndex="0" onKeyDown={(e) => e.key === "Enter" && openPet(pet)}>
              <div className="pet-card__top">
                <div className="pet-avatar">{pet.mainPhoto ? <img src={pet.mainPhoto} alt={pet.name} /> : <PetsRounded />}</div>
                <div><h2>{pet.name}</h2><p>{pet.species} • {pet.breed}</p></div>
                <button aria-label={`Editar ${pet.name}`} onClick={() => openPet(pet)}><EditRounded /></button>
              </div>
              <div className="pet-card__tags"><span>{pet.status}</span><span>{pet.age}</span></div>
              <dl><div><dt>Tutor</dt><dd>{linkedTutor?.name || "Não vinculado"}</dd></div><div><dt>Contato</dt><dd>{linkedTutor?.phone || "—"}</dd></div><div><dt>Vacinação</dt><dd className={pet.vaccine === "Em dia" ? "ok" : "alert"}>{pet.vaccine}</dd></div></dl>
              <small className="pet-card__hint">Duplo clique para abrir a ficha</small>
            </article>;
          })}
        </div>
      </section>

      {editorOpen && <div className="pet-editor-backdrop">
        <section className="pet-editor" role="dialog" aria-modal="true">
          <header className="pet-editor__header">
            <button className="icon-button" onClick={closeEditor}><ArrowBackRounded /></button>
            <div><span>{selectedPet ? "Ficha do pet" : "Novo cadastro"}</span><h2>{form.name || "Cadastrar pet"}</h2></div>
            <button className="icon-button" onClick={closeEditor}><CloseRounded /></button>
          </header>

          <form onSubmit={save}>
            <div className="pet-profile-hero">
              <label className="main-photo-upload">
                {form.mainPhoto ? <img src={form.mainPhoto} alt="Foto principal" /> : <><PhotoCameraRounded /><strong>Foto principal</strong><small>Clique para enviar</small></>}
                <input type="file" accept="image/*" onChange={(e) => readImage(e.target.files?.[0], (value) => setForm((f) => ({ ...f, mainPhoto: value })))} />
              </label>
              <div><h3>{form.name || "Novo pet"}</h3><p>{form.breed || "Preencha os dados básicos"}</p>{tutor && <span>Tutor: {tutor.name}</span>}</div>
            </div>

            <nav className="pet-tabs">
              {[['dados','Dados gerais'],['tutor','Tutor e contatos'],['fotos','Fotos'],['saude','Saúde'],['historico','Histórico']].map(([id,label]) => <button type="button" className={tab===id?'active':''} onClick={() => setTab(id)} key={id}>{label}</button>)}
            </nav>

            <div className="pet-editor__body">
              {tab === "dados" && <div className="pet-form-grid">
                <label>Nome do pet *<input required name="name" value={form.name} onChange={change} /></label>
                <label>Espécie<select name="species" value={form.species} onChange={change}><option>Cão</option><option>Gato</option><option>Outro</option></select></label>
                <label>Raça *<input required name="breed" value={form.breed} onChange={change} /></label>
                <label>Idade<input name="age" value={form.age} onChange={change} placeholder="Ex.: 4 anos" /></label>
                <label>Sexo<select name="sex" value={form.sex} onChange={change}><option>Macho</option><option>Fêmea</option></select></label>
                <label>Cor<input name="color" value={form.color} onChange={change} /></label>
                <label>Status<select name="status" value={form.status} onChange={change}><option>Em casa</option><option>Hospedado</option><option>Creche</option><option>Banho</option><option>Alta hoje</option></select></label>
                <label className="full">Observações<textarea rows="4" name="observations" value={form.observations} onChange={change} /></label>
              </div>}

              {tab === "tutor" && <div className="pet-form-grid">
                <label className="full">Vincular tutor *<select required name="tutorId" value={form.tutorId} onChange={change}><option value="">Selecione um tutor cadastrado</option>{tutors.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
                {tutor ? <>
                  <div className="info-card"><HomeRounded /><div><small>Endereço do tutor</small><strong>{tutor.address}</strong><span>{tutor.city}</span></div></div>
                  <div className="info-card"><ContactEmergencyRounded /><div><small>Contato de emergência</small><strong>{tutor.emergencyName} • {tutor.emergencyRelation}</strong><span>{tutor.emergencyPhone}</span></div></div>
                  <div className="info-card full"><MedicalServicesRounded /><div><small>Veterinário de confiança</small><strong>{tutor.vet}</strong><span>{tutor.vetPhone}</span></div></div>
                </> : <div className="empty-tab full">Selecione um tutor para visualizar endereço, contato de emergência e veterinário.</div>}
              </div>}

              {tab === "fotos" && <div><div className="section-copy"><h3>Galeria obrigatória</h3><p>Registre o pet de quatro ângulos. As imagens serão usadas como referência visual da estadia.</p></div><div className="photo-grid">{photoFields.map(([key,label]) => <label className="photo-upload" key={key}>{form.photos?.[key] ? <img src={form.photos[key]} alt={label} /> : <><AddPhotoAlternateRounded /><strong>{label}</strong><small>Adicionar foto</small></>}<input type="file" accept="image/*" onChange={(e) => readImage(e.target.files?.[0], (value) => setForm((f) => ({ ...f, photos: { ...f.photos, [key]: value } })))} /></label>)}</div></div>}

              {tab === "saude" && <div className="pet-form-grid"><label>Situação da vacinação<select name="vaccine" value={form.vaccine} onChange={change}><option>Em dia</option><option>Vence em 12 dias</option><option>Vencida</option><option>Não informada</option></select></label><div className="empty-tab full">Prontuário de vacinas, medicamentos e anexos será conectado a esta ficha nas próximas evoluções.</div></div>}
              {tab === "historico" && <div className="timeline"><div><span></span><strong>Cadastro do pet</strong><small>Ficha criada no PetHaven</small></div><div><span></span><strong>Última atualização</strong><small>Dados revisados nesta sessão</small></div></div>}
            </div>

            <footer className="pet-editor__footer"><button type="button" className="secondary" onClick={closeEditor}>Cancelar</button><button type="submit" className="primary">Salvar ficha do pet</button></footer>
          </form>
        </section>
      </div>}
    </section>
  );
}
