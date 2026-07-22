import "./Pesquisa.css";

import { useEffect, useMemo, useState } from "react";

import {
  CheckCircleRounded,
  ContentCopyRounded,
  OpenInNewRounded,
  SendRounded,
} from "@mui/icons-material";

const initialForm = {
  estabelecimento: "",
  responsavel: "",
  estado: "",
  cidade: "",
  whatsapp: "",
  email: "",
  tipo: "",
  tempoMercado: "",
  colaboradores: "",
  capacidadeHospedagem: "",
  quantidadePets: "",
  ferramentas: [],
  softwareUtilizado: "",
  tempoCheckin: "",
  dadosCheckin: [],
  outrosCheckin: "",
  dificuldades: [],
  maiorDor: "",
  funcionalidades: [],
  comunicacaoTutor: [],
  acompanhamentoTutor: "",
  impactoSistema: "",
  interesse: "",
  beta: "",
  participarDesenvolvimento: "",
  sugestaoFinal: "",
};

const estados = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"],
  ["AM", "Amazonas"], ["BA", "Bahia"], ["CE", "Ceará"],
  ["DF", "Distrito Federal"], ["ES", "Espírito Santo"],
  ["GO", "Goiás"], ["MA", "Maranhão"], ["MT", "Mato Grosso"],
  ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"],
  ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"],
  ["PE", "Pernambuco"], ["PI", "Piauí"], ["RJ", "Rio de Janeiro"],
  ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"],
  ["SP", "São Paulo"], ["SE", "Sergipe"], ["TO", "Tocantins"],
];

const ferramentasOptions = [
  "WhatsApp", "Papel", "Planilhas Excel", "Google Forms",
  "Sistema próprio", "Software de terceiros", "Agenda de papel", "Outros",
];

const dadosCheckinOptions = [
  "Carteira de vacinação", "Fotos do pet", "Medicamentos", "Alimentação",
  "Contato de emergência", "Veterinário responsável", "Autorização para banho",
  "Autorização para medicamentos", "Restrições e alergias", "Outros (Quais?)",
];

const dificuldadesOptions = [
  "Vacinas vencidas", "Informações espalhadas no WhatsApp",
  "Esquecimento de medicamentos", "Erro na alimentação",
  "Comunicação com o tutor", "Organização de documentos", "Check-in demorado",
  "Agenda e reservas", "Controle financeiro", "Fotos e registros do pet",
  "Histórico do atendimento", "Outros",
];

const funcionalidadesOptions = [
  "Pré-check-in online", "Cadastro completo do pet", "Cadastro de tutores",
  "Fotos obrigatórias do pet", "Carteira de vacinação",
  "Avisos automáticos de vacinas", "Controle de medicamentos",
  "Controle de alimentação", "Contrato digital", "Assinatura digital",
  "Check-in por QR Code", "Agenda e reservas", "Controle financeiro",
  "WhatsApp integrado", "Relatórios", "Dashboard", "Histórico completo do pet",
  "Controle de boxes ou acomodações", "Acompanhamento pelo tutor", "Outros",
];

const comunicacaoOptions = [
  "WhatsApp", "Ligação", "SMS", "E-mail", "Aplicativo", "Não envia atualizações",
];

const PUBLIC_URL = `${window.location.origin}/pesquisa-publica`;

function ChoiceGroup({ options, values, onToggle, limit }) {
  return (
    <div className="choice-grid">
      {options.map((option) => {
        const active = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            className={active ? "choice choice--active" : "choice"}
            onClick={() => onToggle(option, limit)}
          >
            {active && <CheckCircleRounded />}
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function Pesquisa({ publicMode = false }) {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cidades, setCidades] = useState([]);
  const [carregandoCidades, setCarregandoCidades] = useState(false);

  const title = useMemo(
    () =>
      publicMode
        ? "🐾 Bem-vindo à construção da PetHaven"
        : "Pesquisa de Mercado PetHaven",
    [publicMode]
  );

  useEffect(() => {
    if (!form.estado) {
      setCidades([]);
      setCarregandoCidades(false);
      return undefined;
    }

    const controller = new AbortController();

    async function carregarMunicipios() {
      try {
        setCarregandoCidades(true);
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios?orderBy=nome`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Não foi possível carregar os municípios.");
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao carregar municípios:", error);
          setCidades([]);
        }
      } finally {
        setCarregandoCidades(false);
      }
    }

    carregarMunicipios();
    return () => controller.abort();
  }, [form.estado]);

  function change(event) {
    const { name, value } = event.target;
    setForm((current) =>
      name === "estado"
        ? { ...current, estado: value, cidade: "" }
        : { ...current, [name]: value }
    );
  }

  function toggleArray(field, value, limit = null) {
    setForm((current) => {
      const values = current[field];
      if (values.includes(value)) {
        return { ...current, [field]: values.filter((item) => item !== value) };
      }
      if (limit && values.length >= limit) return current;
      return { ...current, [field]: [...values, value] };
    });
  }

  function submit(event) {
    event.preventDefault();
    if (!form.ferramentas.length) return window.alert("Selecione pelo menos uma ferramenta utilizada.");
    if (!form.dadosCheckin.length) return window.alert("Selecione pelo menos uma informação coletada no check-in.");
    if (!form.dificuldades.length) return window.alert("Selecione pelo menos uma dificuldade.");
    if (!form.funcionalidades.length) return window.alert("Selecione pelo menos uma funcionalidade desejada.");

    const previous = JSON.parse(localStorage.getItem("pethaven_pesquisa_respostas") || "[]");
    const answer = {
      ...form,
      enviadoEm: new Date().toISOString(),
      origem: new URLSearchParams(window.location.search).get("origem") || "direto",
    };
    localStorage.setItem("pethaven_pesquisa_respostas", JSON.stringify([...previous, answer]));
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(PUBLIC_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Erro ao copiar link:", error);
    }
  }

  if (sent) {
    return (
      <div className={`research-page ${publicMode ? "research-page--public" : ""}`}>
        <div className="research-success">
          <CheckCircleRounded />
          <h1>Resposta recebida. Muito obrigado!</h1>
          <p>Sua experiência ajudará diretamente na definição das prioridades do PetHaven e na construção de uma solução realmente útil para hotéis e creches pet.</p>
          <button type="button" onClick={() => { setForm(initialForm); setCidades([]); setSent(false); }}>
            Enviar outra resposta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`research-page ${publicMode ? "research-page--public" : ""}`}>
      <section className="research-hero">
        <span>Pesquisa Nacional • PetHaven</span>
        <h1>{title}</h1>
        <div className="hero-content">

    <p className="hero-highlight">
        Muito obrigado por dedicar alguns minutos do seu tempo.
    </p>

    <p>
        Somos uma startup brasileira que está desenvolvendo uma plataforma para simplificar a gestão de hotéis e creches pet.
    </p>

    <p>
        Antes de desenvolver qualquer funcionalidade, decidimos conversar com quem realmente vive essa rotina todos os dias.
    </p>

    <p>
        Sua experiência será uma das bases para construirmos uma solução prática, simples e que faça sentido para o mercado.
    </p>

    <p className="hero-footer">
        ⏱ Tempo estimado: <strong>5 minutos.</strong>

        <br/>

        🔒 As respostas serão utilizadas exclusivamente para orientar o desenvolvimento da plataforma.
    </p>

</div>
        {!publicMode && (
          <div className="share-box">
            <div><strong>Link público da pesquisa</strong><small>{PUBLIC_URL}</small></div>
            <button type="button" onClick={copy}><ContentCopyRounded />{copied ? "Copiado" : "Copiar link"}</button>
            <a href={PUBLIC_URL} target="_blank" rel="noreferrer"><OpenInNewRounded />Abrir</a>
          </div>
        )}
      </section>

      <form className="research-form" onSubmit={submit}>
        <section className="form-card">
          <div className="form-card__title"><span>01</span><div><h2>Sobre o estabelecimento</h2><p>Informações básicas para entendermos seu perfil.</p></div></div>
          <div className="form-grid">
            <label>Nome do estabelecimento<input required name="estabelecimento" value={form.estabelecimento} onChange={change} /></label>
            <label>Nome do responsável<input required name="responsavel" value={form.responsavel} onChange={change} /></label>
            <label>Estado<select required name="estado" value={form.estado} onChange={change}><option value="">Selecione...</option>{estados.map(([sigla, nome]) => <option key={sigla} value={sigla}>{nome}</option>)}</select></label>
            <label>Município<select required name="cidade" value={form.cidade} onChange={change} disabled={!form.estado || carregandoCidades}><option value="">{!form.estado ? "Selecione primeiro o Estado" : carregandoCidades ? "Carregando municípios..." : "Selecione"}</option>{cidades.map((cidade) => <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>)}</select></label>
            <label>WhatsApp<input required name="whatsapp" value={form.whatsapp} onChange={change} placeholder="(00) 00000-0000" /></label>
            <label>E-mail<input type="email" name="email" value={form.email} onChange={change} /></label>
            <label>Tipo de negócio<select required name="tipo" value={form.tipo} onChange={change}><option value="">Selecione</option><option>Hotel pet</option><option>Creche pet</option><option>Hotel + Creche</option><option>Clínica veterinária</option><option>Pet shop</option><option>Outro</option></select></label>
            <label>Tempo de mercado<select required name="tempoMercado" value={form.tempoMercado} onChange={change}><option value="">Selecione</option><option>Menos de 1 ano</option><option>1 a 3 anos</option><option>3 a 5 anos</option><option>5 a 10 anos</option><option>Mais de 10 anos</option></select></label>
            <label>Número de colaboradores<input required type="number" min="0" name="colaboradores" value={form.colaboradores} onChange={change} /></label>
            <label>Capacidade máxima de hospedagem<input type="number" min="0" name="capacidadeHospedagem" value={form.capacidadeHospedagem} onChange={change} /></label>
            <label>Média de pets atendidos por mês<input required type="number" min="0" name="quantidadePets" value={form.quantidadePets} onChange={change} /></label>
          </div>
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>02</span><div><h2>Como funciona hoje</h2><p>Marque todas as ferramentas usadas na operação.</p></div></div>
          <ChoiceGroup options={ferramentasOptions} values={form.ferramentas} onToggle={(value) => toggleArray("ferramentas", value)} />
          <div className="form-grid" style={{ marginTop: 18 }}><label>Qual sistema ou software utiliza atualmente?<input name="softwareUtilizado" value={form.softwareUtilizado} onChange={change} placeholder="Deixe em branco se não utiliza" /></label></div>
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>03</span><div><h2>Check-in e recebimento do pet</h2><p>Queremos entender como esse processo acontece hoje.</p></div></div>
          <div className="form-grid"><label>Quanto tempo o check-in costuma levar?<select required name="tempoCheckin" value={form.tempoCheckin} onChange={change}><option value="">Selecione</option><option>Menos de 5 minutos</option><option>5 a 10 minutos</option><option>10 a 20 minutos</option><option>Mais de 20 minutos</option></select></label></div>
          <p style={{ margin: "22px 0 12px", fontWeight: 800 }}>Quais informações você normalmente coleta no check-in?</p>
          <ChoiceGroup options={dadosCheckinOptions} values={form.dadosCheckin} onToggle={(value) => toggleArray("dadosCheckin", value)} />
        {form.dadosCheckin.includes("Outro") && (

    <label style={{ marginTop: 20 }}>

        Quais outras informações você normalmente coleta no check-in?

        <textarea
            rows="4"
            name="outrosCheckin"
            value={form.outrosCheckin}
            onChange={change}
            placeholder="Descreva outras informações coletadas durante o check-in..."
        />

    </label>

)}
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>04</span><div><h2>Principais dificuldades</h2><p>Selecione até cinco problemas que mais afetam sua rotina.</p></div></div>
          <ChoiceGroup options={dificuldadesOptions} values={form.dificuldades} onToggle={(value, limit) => toggleArray("dificuldades", value, limit)} limit={5} />
          <label style={{ marginTop: 18 }}>Se pudesse eliminar apenas um problema operacional hoje, qual seria?<textarea required rows="5" name="maiorDor" value={form.maiorDor} onChange={change} placeholder="Ex.: demora no check-in, informações espalhadas no WhatsApp, controle de vacinas..." /></label>
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>05</span><div><h2>Funcionalidades desejadas</h2><p>Marque o que seria mais útil em uma plataforma.</p></div></div>
          <ChoiceGroup options={funcionalidadesOptions} values={form.funcionalidades} onToggle={(value) => toggleArray("funcionalidades", value)} />
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>06</span><div><h2>Comunicação com o tutor</h2><p>Como você atualiza o responsável durante a hospedagem?</p></div></div>
          <ChoiceGroup options={comunicacaoOptions} values={form.comunicacaoTutor} onToggle={(value) => toggleArray("comunicacaoTutor", value)} />
          <div className="form-grid" style={{ marginTop: 18 }}><label>Gostaria que o tutor acompanhasse a hospedagem digitalmente?<select required name="acompanhamentoTutor" value={form.acompanhamentoTutor} onChange={change}><option value="">Selecione</option><option>Sim</option><option>Talvez</option><option>Não</option></select></label></div>
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>07</span><div><h2>Interesse em uma solução</h2><p>Queremos entender o potencial de adoção.</p></div></div>
          <div className="form-grid">
           <label>

    Quanto um sistema como esse ajudaria sua operação?

    <div className="rating-scale">

        {[
            {
                value: "1",
                emoji: "😟",
                text: "Muito baixo",
            },
            {
                value: "2",
                emoji: "😕",
                text: "Baixo",
            },
            {
                value: "3",
                emoji: "🙂",
                text: "Médio",
            },
            {
                value: "4",
                emoji: "😃",
                text: "Alto",
            },
            {
                value: "5",
                emoji: "🤩",
                text: "Essencial",
            },
        ].map((item) => (

            <button
                key={item.value}
                type="button"
                className={
                    form.impactoSistema === item.value
                        ? "rating-card rating-card--active"
                        : "rating-card"
                }
                onClick={() =>
                    setForm((v) => ({
                        ...v,
                        impactoSistema: item.value,
                    }))
                }
            >

                <span className="rating-emoji">
                    {item.emoji}
                </span>

                <strong>{item.value}</strong>

                <small>{item.text}</small>

            </button>

        ))}

    </div>

</label>
            <label>Você teria interesse em utilizar o PetHaven?<select required name="interesse" value={form.interesse} onChange={change}><option value="">Selecione</option><option>Sim</option><option>Talvez</option><option>Não</option></select></label>
            <label>Aceitaria testar gratuitamente como parceiro beta?<select required name="beta" value={form.beta} onChange={change}><option value="">Selecione</option><option>Sim</option><option>Talvez</option><option>Não</option></select></label>
          </div>
        </section>

        <section className="form-card">
          <div className="form-card__title"><span>08</span><div><h2>Sugestões</h2><p>Seu conhecimento pode ajudar a orientar o desenvolvimento.</p></div></div>
          <label style={{ marginTop: 18 }}>Tem alguma sugestão, necessidade ou dificuldade que não foi abordada?<textarea rows="6" name="sugestaoFinal" value={form.sugestaoFinal} onChange={change} placeholder="Escreva livremente..." /></label>
        </section>

        <button className="submit-research" type="submit"><SendRounded />Enviar participação</button>
      </form>
    </div>
  );
}
