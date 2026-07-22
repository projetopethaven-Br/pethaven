import HeroLogo from "../../assets/logo branca1.png";
import "./Pesquisa.css";
import LegalCenter from "../../components/Legal/LegalCenter";
import { salvarPesquisa } from "../../services/pesquisaService";
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
  outrasFuncionalidades: "",
  comunicacaoTutor: [],
  acompanhamentoTutor: "",
  impactoSistema: "",
  interesse: "",
  beta: "",
  participarDesenvolvimento: "",
  sugestaoFinal: "",
  consentimentoPolitica: false,
  consentimentoContato: false,
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
  "Controle de boxes ou acomodações", "Acompanhamento pelo tutor", "Outros (Quais?)",
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
  const [legalOpen, setLegalOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const title = useMemo(
    () =>
      publicMode
        ? ""
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
        const updatedValues = values.filter((item) => item !== value);

        return {
          ...current,
          [field]: updatedValues,
          ...(field === "dadosCheckin" && value === "Outros (Quais?)"
            ? { outrosCheckin: "" }
            : {}),
          ...(field === "funcionalidades" && value === "Outros (Quais?)"
            ? { outrasFuncionalidades: "" }
            : {}),
        };
      }

      if (limit && values.length >= limit) return current;

      return {
        ...current,
        [field]: [...values, value],
      };
    });
  }

  async function submit(event) {
    event.preventDefault();

    if (enviando) return;

    if (!form.ferramentas.length) {
      return window.alert("Selecione pelo menos uma ferramenta utilizada.");
    }

    if (!form.dadosCheckin.length) {
      return window.alert(
        "Selecione pelo menos uma informação coletada no check-in."
      );
    }

    if (!form.dificuldades.length) {
      return window.alert("Selecione pelo menos uma dificuldade.");
    }

    if (!form.funcionalidades.length) {
      return window.alert(
        "Selecione pelo menos uma funcionalidade desejada."
      );
    }

    if (!form.comunicacaoTutor.length) {
      return window.alert(
        "Selecione pelo menos uma forma de comunicação com o tutor."
      );
    }

    if (!form.impactoSistema) {
      return window.alert(
        "Informe quanto um sistema como esse ajudaria sua operação."
      );
    }

    if (!form.consentimentoPolitica) {
      return window.alert(
        "Leia e aceite a Política de Privacidade para enviar a pesquisa."
      );
    }

    try {
      setEnviando(true);

      const pesquisa = {
        empresa: {
          estabelecimento: form.estabelecimento.trim(),
          responsavel: form.responsavel.trim(),
          estado: form.estado,
          cidade: form.cidade,
          whatsapp: form.whatsapp.trim(),
          email: form.email.trim(),
          tipo: form.tipo,
          tempoMercado: form.tempoMercado,
          colaboradores: form.colaboradores
            ? Number(form.colaboradores)
            : 0,
          capacidadeHospedagem: form.capacidadeHospedagem
            ? Number(form.capacidadeHospedagem)
            : null,
          quantidadePets: form.quantidadePets
            ? Number(form.quantidadePets)
            : 0,
        },

        respostas: {
          ferramentas: form.ferramentas,
          softwareUtilizado: form.softwareUtilizado.trim(),
          tempoCheckin: form.tempoCheckin,
          dadosCheckin: form.dadosCheckin,
          outrosCheckin: form.outrosCheckin.trim(),
          dificuldades: form.dificuldades,
          maiorDor: form.maiorDor.trim(),
          funcionalidades: form.funcionalidades,
          outrasFuncionalidades: form.outrasFuncionalidades.trim(),
          comunicacaoTutor: form.comunicacaoTutor,
          acompanhamentoTutor: form.acompanhamentoTutor,
          impactoSistema: form.impactoSistema,
          interesse: form.interesse,
          beta: form.beta,
          participarDesenvolvimento: form.participarDesenvolvimento,
          sugestaoFinal: form.sugestaoFinal.trim(),
        },

        lgpd: {
          aceitouPolitica: form.consentimentoPolitica,
          aceitouContato: form.consentimentoContato,
          versaoPoliticaPrivacidade: "1.0 - julho/2026",
        },

        metadata: {
          origem:
            new URLSearchParams(window.location.search).get("origem") ||
            "direto",
          status: "recebida",
          versaoFormulario: "2.1",
          urlPagina: window.location.href,
          userAgent: navigator.userAgent,
        },
      };

      await salvarPesquisa(pesquisa);

      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Erro ao salvar pesquisa:", error);

      window.alert(
        "Não foi possível enviar a pesquisa agora. Verifique sua conexão e tente novamente."
      );
    } finally {
      setEnviando(false);
    }
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

    <img
        src={HeroLogo}
        alt="PetHaven"
        className="hero-logo"
    />

    <h1>{title}</h1>

    <div className="hero-content">

    <p className="hero-highlight">
        Obrigado pelo seu tempo!
    </p>

    <p>
        Estamos desenvolvendo uma plataforma para simplificar a gestão de hotéis e creches pet.
    </p>

    <p>
       Queremos ouvir quem vive essa rotina para criar uma solução prática e alinhada às necessidades do mercado.
    </p>
    <p className="hero-footer">
        ⏱ Tempo estimado: <strong>5 minutos.</strong>

        <br/>

        🔒 Suas respostas serão utilizadas exclusivamente no desenvolvimento da plataforma, em conformidade com a LGPD (Lei nº 13.709/2018)
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
        {form.dadosCheckin.includes("Outros (Quais?)") && (

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
  <div className="form-card__title">
    <span>05</span>

    <div>
      <h2>Funcionalidades desejadas</h2>
      <p>Marque o que seria mais útil em uma plataforma.</p>
    </div>
  </div>

  <ChoiceGroup
    options={funcionalidadesOptions}
    values={form.funcionalidades}
    onToggle={(value) => toggleArray("funcionalidades", value)}
  />

  {form.funcionalidades.includes("Outros (Quais?)") && (
    <label style={{ marginTop: 20 }}>
      Qual outra funcionalidade seria útil?

      <textarea
        rows="4"
        name="outrasFuncionalidades"
        value={form.outrasFuncionalidades}
        onChange={change}
        placeholder="Descreva brevemente outra funcionalidade que gostaria de encontrar na plataforma..."
        required
      />
    </label>
  )}
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

        <section className="legal-consent-card" aria-labelledby="legal-consent-title">
          <div className="legal-consent-card__header">
            <div>
              <span className="legal-consent-card__eyebrow">Privacidade e LGPD</span>
              <h2 id="legal-consent-title">Seus dados, suas escolhas</h2>
              <p>
                Consulte os documentos jurídicos da PetHaven e escolha como seus
                dados poderão ser utilizados.
              </p>
            </div>

            <button
              type="button"
              className="legal-policy-button"
              onClick={() => setLegalOpen(true)}
            >
              Política de Privacidade
            </button>
          </div>

          <label className="legal-checkbox">
            <input
              type="checkbox"
              checked={form.consentimentoPolitica}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  consentimentoPolitica: event.target.checked,
                }))
              }
              required
            />
            <span>
              Li a Política de Privacidade e autorizo o tratamento dos dados
              informados para realização da pesquisa, análise estatística e
              desenvolvimento da plataforma PetHaven.
              <strong> Consentimento obrigatório para enviar.</strong>
            </span>
          </label>

          <label className="legal-checkbox">
            <input
              type="checkbox"
              checked={form.consentimentoContato}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  consentimentoContato: event.target.checked,
                }))
              }
            />
            <span>
              Autorizo, de forma opcional, que a PetHaven entre em contato por
              WhatsApp ou e-mail para apresentar resultados da pesquisa,
              novidades do projeto ou convite para testes beta.
              <strong> Consentimento opcional.</strong>
            </span>
          </label>

          <p className="legal-consent-card__note">
            Você poderá solicitar acesso, correção, exclusão dos dados ou
            revogação do consentimento pelos canais indicados na Política de
            Privacidade.
          </p>
        </section>

        <button
          className="submit-research"
          type="submit"
          disabled={enviando}
          aria-busy={enviando}
        >
          <SendRounded />
          {enviando ? "Enviando..." : "Enviar participação"}
        </button>
      </form>

      <LegalCenter
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
      />
    </div>
  );
}
