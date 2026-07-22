import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CameraAltRounded,
  CheckCircleRounded,
  CloudUploadRounded,
  DeleteOutlineRounded,
  PetsRounded,
  ShieldRounded,
} from "@mui/icons-material";

import "./PreCheckinPublico.css";

const steps = [
  "Tutor",
  "Pet",
  "Fotos",
  "Vacinas",
  "Cuidados",
  "Confirmação",
];

const requiredPhotos = [
  { key: "front", label: "Frente" },
  { key: "back", label: "Traseira" },
  { key: "left", label: "Lado esquerdo" },
  { key: "right", label: "Lado direito" },
];

const vaccineCatalog = {
  Cão: [
    { id: "v8v10", name: "V8 ou V10", months: 12 },
    { id: "rabies-dog", name: "Antirrábica", months: 12 },
    { id: "flu", name: "Gripe canina", months: 12 },
    { id: "giardia", name: "Giárdia", months: 12 },
  ],
  Gato: [
    { id: "v3v4v5", name: "V3, V4 ou V5", months: 12 },
    { id: "rabies-cat", name: "Antirrábica", months: 12 },
    { id: "felv", name: "FeLV", months: 12 },
  ],
};

const initialForm = {
  tutorName: "",
  tutorCpf: "",
  tutorPhone: "",
  tutorEmail: "",
  address: "",
  petName: "",
  species: "Cão",
  breed: "",
  birthDate: "",
  sex: "Macho",
  weight: "",
  castrated: "Não",
  microchip: "",
  photos: {},
  vaccines: {},
  food: "",
  foodTimes: "",
  allergies: "",
  medications: "",
  behavior: "",
  emergencyVet: "",
  emergencyPhone: "",
  terms: false,
};

function addMonths(dateString, months) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T12:00:00`);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().slice(0, 10);
}

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${dateString}T12:00:00`)
  );
}

export default function PreCheckinPublico() {
  const { token } = useParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const objectUrls = useRef([]);

  const vaccines = vaccineCatalog[form.species] ?? vaccineCatalog.Cão;
  const progress = ((step + 1) / steps.length) * 100;

  const photoCount = Object.values(form.photos).filter(Boolean).length;

  const vaccineRows = useMemo(
    () =>
      vaccines.map((item) => {
        const record = form.vaccines[item.id] || {};
        return {
          ...item,
          ...record,
          expiresAt: addMonths(record.appliedAt, item.months),
        };
      }),
    [vaccines, form.vaccines]
  );

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  }

  function updatePhoto(key, file) {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    objectUrls.current.push(preview);

    setForm((current) => ({
      ...current,
      photos: {
        ...current.photos,
        [key]: {
          name: file.name,
          size: file.size,
          preview,
        },
      },
    }));
    setError("");
  }

  function removePhoto(key) {
    const currentPhoto = form.photos[key];
    if (currentPhoto?.preview) URL.revokeObjectURL(currentPhoto.preview);

    setForm((current) => {
      const nextPhotos = { ...current.photos };
      delete nextPhotos[key];
      return { ...current, photos: nextPhotos };
    });
  }

  function updateVaccine(vaccineId, field, value) {
    setForm((current) => ({
      ...current,
      vaccines: {
        ...current.vaccines,
        [vaccineId]: {
          ...(current.vaccines[vaccineId] || {}),
          [field]: value,
        },
      },
    }));
    setError("");
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (!form.tutorName || !form.tutorPhone || !form.tutorCpf) {
        return "Preencha nome, CPF e WhatsApp do tutor.";
      }
    }

    if (step === 1) {
      if (!form.petName || !form.breed || !form.birthDate) {
        return "Preencha nome, raça e data de nascimento do pet.";
      }
    }

    if (step === 2 && photoCount < 4) {
      return "Envie as quatro fotos obrigatórias do animal.";
    }

    if (step === 3) {
      const missing = vaccineRows.some(
        (item) => !item.appliedAt || !item.documentName
      );
      if (missing) {
        return "Informe a data e anexe o comprovante de cada vacina exibida.";
      }
    }

    if (step === 4 && !form.food) {
      return "Informe a alimentação do pet.";
    }

    if (step === 5 && !form.terms) {
      return "Confirme a declaração antes de enviar.";
    }

    return "";
  }

  function nextStep() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitForm() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      ...form,
      token,
      submittedAt: new Date().toISOString(),
      status: "Aguardando validação",
    };

    localStorage.setItem(
      `pethaven-precheckin-${token || "demo"}`,
      JSON.stringify(payload)
    );

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <main className="pc-public pc-public--success">
        <section className="pc-success-card">
          <div className="pc-success-card__icon">
            <CheckCircleRounded />
          </div>
          <span>Pré-check-in enviado</span>
          <h1>Obrigado, {form.tutorName.split(" ")[0]}!</h1>
          <p>
            Os dados de <strong>{form.petName}</strong> foram enviados para o
            estabelecimento e agora aguardam validação.
          </p>
          <div className="pc-success-card__status">
            <ShieldRounded />
            Status: aguardando conferência do hotel
          </div>
          <small>Protocolo: {token || "DEMONSTRACAO"}</small>
        </section>
      </main>
    );
  }

  return (
    <main className="pc-public">
      <header className="pc-public__brand">
        <div className="pc-public__logo">
          <PetsRounded />
        </div>
        <div>
          <strong>PetHaven</strong>
          <span>Pré-check-in digital</span>
        </div>
      </header>

      <section className="pc-shell">
        <div className="pc-intro">
          <div>
            <span className="pc-kicker">Cadastro do tutor</span>
            <h1>Prepare a estadia do seu pet</h1>
            <p>
              Preencha os dados com atenção. O hotel fará a conferência antes
              do check-in.
            </p>
          </div>
          <div className="pc-security">
            <ShieldRounded />
            Ambiente seguro
          </div>
        </div>

        <div className="pc-progress">
          <div className="pc-progress__track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="pc-progress__labels">
            {steps.map((label, index) => (
              <button
                type="button"
                key={label}
                className={[
                  index === step ? "is-active" : "",
                  index < step ? "is-complete" : "",
                ].join(" ")}
                onClick={() => {
                  if (index < step) {
                    setStep(index);
                    setError("");
                  }
                }}
              >
                <span>{index < step ? "✓" : index + 1}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <section className="pc-card">
          {step === 0 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 1 de 6</span>
                <h2>Dados do tutor responsável</h2>
                <p>Informe quem será o contato principal durante a estadia.</p>
              </div>

              <div className="pc-form-grid">
                <label>
                  Nome completo *
                  <input
                    name="tutorName"
                    value={form.tutorName}
                    onChange={updateField}
                    placeholder="Ex.: Carlos Mendes"
                  />
                </label>

                <label>
                  CPF *
                  <input
                    name="tutorCpf"
                    value={form.tutorCpf}
                    onChange={updateField}
                    placeholder="000.000.000-00"
                  />
                </label>

                <label>
                  WhatsApp *
                  <input
                    name="tutorPhone"
                    value={form.tutorPhone}
                    onChange={updateField}
                    placeholder="(00) 00000-0000"
                  />
                </label>

                <label>
                  E-mail
                  <input
                    type="email"
                    name="tutorEmail"
                    value={form.tutorEmail}
                    onChange={updateField}
                    placeholder="nome@email.com"
                  />
                </label>

                <label className="pc-form-grid__full">
                  Endereço
                  <input
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    placeholder="Rua, número, bairro e cidade"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 2 de 6</span>
                <h2>Dados do animal</h2>
                <p>Essas informações formarão a ficha digital do pet.</p>
              </div>

              <div className="pc-form-grid">
                <label>
                  Nome do pet *
                  <input
                    name="petName"
                    value={form.petName}
                    onChange={updateField}
                    placeholder="Ex.: Thor"
                  />
                </label>

                <label>
                  Espécie *
                  <select
                    name="species"
                    value={form.species}
                    onChange={(event) => {
                      updateField(event);
                      setForm((current) => ({
                        ...current,
                        species: event.target.value,
                        vaccines: {},
                      }));
                    }}
                  >
                    <option>Cão</option>
                    <option>Gato</option>
                  </select>
                </label>

                <label>
                  Raça *
                  <input
                    name="breed"
                    value={form.breed}
                    onChange={updateField}
                    placeholder="Ex.: Labrador"
                  />
                </label>

                <label>
                  Data de nascimento *
                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={updateField}
                  />
                </label>

                <label>
                  Sexo
                  <select name="sex" value={form.sex} onChange={updateField}>
                    <option>Macho</option>
                    <option>Fêmea</option>
                  </select>
                </label>

                <label>
                  Peso aproximado
                  <input
                    name="weight"
                    value={form.weight}
                    onChange={updateField}
                    placeholder="Ex.: 18 kg"
                  />
                </label>

                <label>
                  Castrado?
                  <select
                    name="castrated"
                    value={form.castrated}
                    onChange={updateField}
                  >
                    <option>Não</option>
                    <option>Sim</option>
                  </select>
                </label>

                <label>
                  Número do microchip
                  <input
                    name="microchip"
                    value={form.microchip}
                    onChange={updateField}
                    placeholder="Opcional"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 3 de 6</span>
                <h2>Fotos obrigatórias do animal</h2>
                <p>
                  Envie fotos recentes, com boa iluminação e mostrando o corpo
                  inteiro. As quatro posições são obrigatórias.
                </p>
              </div>

              <div className="pc-photo-grid">
                {requiredPhotos.map((photo) => {
                  const uploaded = form.photos[photo.key];

                  return (
                    <article
                      className={`pc-photo-card ${uploaded ? "is-filled" : ""}`}
                      key={photo.key}
                    >
                      {uploaded ? (
                        <>
                          <img src={uploaded.preview} alt={photo.label} />
                          <div className="pc-photo-card__overlay">
                            <strong>{photo.label}</strong>
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.key)}
                            >
                              <DeleteOutlineRounded />
                              Remover
                            </button>
                          </div>
                        </>
                      ) : (
                        <label>
                          <CameraAltRounded />
                          <strong>{photo.label}</strong>
                          <span>Toque para fotografar ou escolher uma imagem</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(event) =>
                              updatePhoto(photo.key, event.target.files?.[0])
                            }
                          />
                        </label>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="pc-photo-counter">
                <CloudUploadRounded />
                {photoCount} de 4 fotos enviadas
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 4 de 6</span>
                <h2>Vacinação</h2>
                <p>
                  Informe a data aplicada e anexe uma foto ou PDF do
                  comprovante. O vencimento é calculado automaticamente.
                </p>
              </div>

              <div className="pc-vaccine-list">
                {vaccineRows.map((vaccine) => (
                  <article className="pc-vaccine-card" key={vaccine.id}>
                    <div className="pc-vaccine-card__title">
                      <div>
                        <strong>{vaccine.name}</strong>
                        <span>Validade padrão: {vaccine.months} meses</span>
                      </div>
                      {vaccine.appliedAt && vaccine.documentName && (
                        <CheckCircleRounded />
                      )}
                    </div>

                    <div className="pc-form-grid pc-form-grid--vaccine">
                      <label>
                        Data da aplicação *
                        <input
                          type="date"
                          value={vaccine.appliedAt || ""}
                          onChange={(event) =>
                            updateVaccine(
                              vaccine.id,
                              "appliedAt",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Próximo vencimento
                        <input
                          value={formatDate(vaccine.expiresAt)}
                          readOnly
                        />
                      </label>

                      <label className="pc-upload-label pc-form-grid__full">
                        <CloudUploadRounded />
                        <span>
                          {vaccine.documentName ||
                            "Anexar carteira, certificado ou comprovante"}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(event) =>
                            updateVaccine(
                              vaccine.id,
                              "documentName",
                              event.target.files?.[0]?.name || ""
                            )
                          }
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pc-info-box">
                O estabelecimento poderá ajustar quais vacinas são obrigatórias
                conforme sua política e orientação veterinária.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 5 de 6</span>
                <h2>Saúde, alimentação e comportamento</h2>
                <p>
                  Registre instruções essenciais para a segurança e o bem-estar
                  do animal.
                </p>
              </div>

              <div className="pc-form-grid">
                <label className="pc-form-grid__full">
                  Alimentação *
                  <textarea
                    name="food"
                    value={form.food}
                    onChange={updateField}
                    placeholder="Ração, quantidade, restrições e orientações"
                  />
                </label>

                <label>
                  Horários da alimentação
                  <input
                    name="foodTimes"
                    value={form.foodTimes}
                    onChange={updateField}
                    placeholder="Ex.: 08h e 18h"
                  />
                </label>

                <label>
                  Veterinário de emergência
                  <input
                    name="emergencyVet"
                    value={form.emergencyVet}
                    onChange={updateField}
                    placeholder="Nome ou clínica"
                  />
                </label>

                <label className="pc-form-grid__full">
                  Alergias ou condições de saúde
                  <textarea
                    name="allergies"
                    value={form.allergies}
                    onChange={updateField}
                    placeholder="Informe alergias, doenças, cirurgias ou limitações"
                  />
                </label>

                <label className="pc-form-grid__full">
                  Medicamentos
                  <textarea
                    name="medications"
                    value={form.medications}
                    onChange={updateField}
                    placeholder="Nome, dosagem e horários"
                  />
                </label>

                <label className="pc-form-grid__full">
                  Comportamento e convivência
                  <textarea
                    name="behavior"
                    value={form.behavior}
                    onChange={updateField}
                    placeholder="Medos, agressividade, socialização, fugas ou hábitos importantes"
                  />
                </label>

                <label>
                  Telefone do veterinário
                  <input
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={updateField}
                    placeholder="(00) 00000-0000"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="pc-step">
              <div className="pc-step__heading">
                <span>Etapa 6 de 6</span>
                <h2>Revise e confirme</h2>
                <p>
                  Confira o resumo antes de enviar para validação do
                  estabelecimento.
                </p>
              </div>

              <div className="pc-review-grid">
                <article>
                  <span>Tutor</span>
                  <strong>{form.tutorName}</strong>
                  <p>{form.tutorPhone}</p>
                </article>
                <article>
                  <span>Pet</span>
                  <strong>{form.petName}</strong>
                  <p>
                    {form.species} • {form.breed}
                  </p>
                </article>
                <article>
                  <span>Fotos</span>
                  <strong>{photoCount} enviadas</strong>
                  <p>Frente, traseira e dois lados</p>
                </article>
                <article>
                  <span>Vacinas</span>
                  <strong>{vaccineRows.length} registradas</strong>
                  <p>Com cálculo automático de validade</p>
                </article>
              </div>

              <label className="pc-terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={updateField}
                />
                <span>
                  Declaro que as informações fornecidas são verdadeiras e
                  autorizo o estabelecimento a utilizá-las para o atendimento,
                  hospedagem e cuidados do animal.
                </span>
              </label>
            </div>
          )}

          {error && <div className="pc-error">{error}</div>}

          <footer className="pc-actions">
            <button
              type="button"
              className="pc-button pc-button--secondary"
              onClick={previousStep}
              disabled={step === 0}
            >
              <ArrowBackRounded />
              Voltar
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                className="pc-button pc-button--primary"
                onClick={nextStep}
              >
                Continuar
                <ArrowForwardRounded />
              </button>
            ) : (
              <button
                type="button"
                className="pc-button pc-button--primary"
                onClick={submitForm}
              >
                Enviar pré-check-in
                <CheckCircleRounded />
              </button>
            )}
          </footer>
        </section>

        <p className="pc-footer-note">
          Link de demonstração: <strong>{token || "sem-token"}</strong>
        </p>
      </section>
    </main>
  );
}
