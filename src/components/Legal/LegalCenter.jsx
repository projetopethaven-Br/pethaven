import { useEffect, useState } from "react";
import "./LegalCenter.css";

const LEGAL_CONTACT_EMAIL = "privacidade@pethaven.com.br";
const LEGAL_VERSION = "1.0";
const LEGAL_UPDATED_AT = "Julho de 2026";
const CONTROLLER_NAME = "PetHaven — startup em desenvolvimento";

const sections = [
  { id: "privacidade", label: "Política de Privacidade" },
  { id: "termos", label: "Termos de Uso" },
  { id: "consentimento", label: "Consentimento LGPD" },
  { id: "pesquisa", label: "Uso da Pesquisa" },
  { id: "cookies", label: "Cookies e armazenamento" },
  { id: "direitos", label: "Direitos do titular" },
];

function PrivacyPolicy() {
  return (
    <>
      <h2>Política de Privacidade</h2>
      <p className="legal-meta">
        Versão {LEGAL_VERSION} · Atualizada em {LEGAL_UPDATED_AT}
      </p>

      <h3>1. Identificação do controlador</h3>
      <p>
        Para esta pesquisa, o controlador dos dados pessoais é
        <strong> {CONTROLLER_NAME}</strong>. Antes da publicação definitiva,
        os dados cadastrais completos e o canal oficial de privacidade deverão
        ser confirmados pela equipe responsável.
      </p>

      <h3>2. Dados coletados</h3>
      <p>
        Poderão ser coletados: nome do estabelecimento, nome do responsável,
        Estado, município, WhatsApp, e-mail, características operacionais do
        negócio, opiniões, dificuldades, interesses e demais respostas
        fornecidas voluntariamente.
      </p>

      <h3>3. Finalidades do tratamento</h3>
      <ul>
        <li>realizar pesquisa e diagnóstico de mercado;</li>
        <li>produzir análises e estatísticas, preferencialmente agregadas;</li>
        <li>orientar o desenvolvimento da plataforma PetHaven;</li>
        <li>administrar convites para testes beta, quando autorizado;</li>
        <li>atender solicitações e exercer direitos previstos em lei.</li>
      </ul>

      <h3>4. Bases legais</h3>
      <p>
        O tratamento relacionado à participação na pesquisa é realizado com
        base no consentimento do titular. O contato promocional ou convite para
        novidades depende de autorização separada e opcional.
      </p>

      <h3>5. Compartilhamento</h3>
      <p>
        A PetHaven não comercializa dados pessoais. Informações poderão ser
        tratadas por fornecedores de infraestrutura, hospedagem, banco de dados
        ou segurança estritamente necessários à operação, sujeitos a medidas
        contratuais e técnicas adequadas. Também poderá haver compartilhamento
        quando exigido por lei ou autoridade competente.
      </p>

      <h3>6. Retenção e exclusão</h3>
      <p>
        Os dados serão mantidos pelo período necessário às finalidades desta
        pesquisa, ao desenvolvimento do projeto e ao cumprimento de obrigações
        legais. Quando deixarem de ser necessários, serão eliminados ou
        anonimizados, salvo hipótese legal de conservação.
      </p>

      <h3>7. Segurança</h3>
      <p>
        Serão adotadas medidas razoáveis de segurança, controle de acesso,
        cópias de proteção e registro de operações compatíveis com a fase do
        projeto. Nenhum sistema é absolutamente imune a incidentes; eventuais
        ocorrências relevantes serão tratadas conforme a legislação aplicável.
      </p>

      <h3>8. Canal de privacidade</h3>
      <p>
        Solicitações poderão ser encaminhadas para:
        <strong> {LEGAL_CONTACT_EMAIL}</strong>.
      </p>
    </>
  );
}

function TermsOfUse() {
  return (
    <>
      <h2>Termos de Uso da Pesquisa</h2>
      <p className="legal-meta">
        Versão {LEGAL_VERSION} · Atualizada em {LEGAL_UPDATED_AT}
      </p>

      <h3>1. Finalidade</h3>
      <p>
        Esta página destina-se à coleta de opiniões e informações de mercado
        para apoiar o desenvolvimento da PetHaven. Ela não constitui oferta,
        contratação, promessa de entrega ou garantia de disponibilidade de
        funcionalidades.
      </p>

      <h3>2. Participação voluntária</h3>
      <p>
        A participação é gratuita e voluntária. O participante declara que as
        informações fornecidas refletem, de boa-fé, sua experiência ou a
        realidade do estabelecimento que representa.
      </p>

      <h3>3. Disponibilidade</h3>
      <p>
        A pesquisa poderá ser atualizada, suspensa ou encerrada a qualquer
        momento. Poderão ocorrer indisponibilidades temporárias decorrentes de
        manutenção, falhas de rede ou serviços de terceiros.
      </p>

      <h3>4. Uso adequado</h3>
      <p>
        Não é permitido utilizar a página para inserir conteúdo ilícito,
        ofensivo, fraudulento, códigos maliciosos ou dados pessoais de terceiros
        sem autorização.
      </p>

      <h3>5. Propriedade intelectual</h3>
      <p>
        A marca, o layout, os textos, os componentes e o código da PetHaven são
        protegidos pela legislação aplicável. A participação na pesquisa não
        transfere direitos sobre o projeto.
      </p>
    </>
  );
}

function ConsentTerms() {
  return (
    <>
      <h2>Termo de Consentimento LGPD</h2>
      <p>
        Ao marcar o consentimento obrigatório e enviar a pesquisa, o
        participante declara que:
      </p>
      <ul>
        <li>teve acesso a esta Central de Privacidade;</li>
        <li>
          autoriza o tratamento dos dados fornecidos para pesquisa de mercado,
          análise estatística e desenvolvimento da PetHaven;
        </li>
        <li>
          compreende que poderá revogar o consentimento, sem afetar tratamentos
          anteriores realizados de forma legítima;
        </li>
        <li>
          compreende que o consentimento para receber contatos e novidades é
          separado, facultativo e pode ser recusado.
        </li>
      </ul>
      <p>
        O registro da resposta poderá conter data, horário, versão da política e
        origem do acesso para demonstrar a manifestação do consentimento.
      </p>
    </>
  );
}

function ResearchUse() {
  return (
    <>
      <h2>Uso das Respostas da Pesquisa</h2>
      <p>As respostas poderão ser usadas para:</p>
      <ul>
        <li>identificar dificuldades operacionais do setor;</li>
        <li>priorizar funcionalidades e validar hipóteses de produto;</li>
        <li>produzir gráficos e relatórios estatísticos;</li>
        <li>
          divulgar conclusões gerais sem identificar individualmente os
          participantes;
        </li>
        <li>
          selecionar interessados em testes beta, apenas quando houver
          autorização para contato.
        </li>
      </ul>
      <p>
        Depoimentos identificados, logotipos ou nomes de estabelecimentos não
        serão usados em publicidade sem autorização específica.
      </p>
    </>
  );
}

function CookiesPolicy() {
  return (
    <>
      <h2>Cookies e Armazenamento Local</h2>
      <p>
        A versão atual pode utilizar armazenamento local do navegador para
        funcionamento e testes. Na publicação, poderão ser utilizados cookies
        ou tecnologias semelhantes estritamente necessários à segurança,
        estabilidade, preferências e continuidade da sessão.
      </p>
      <p>
        Cookies de medição, publicidade ou rastreamento não essenciais deverão
        depender de informação clara e, quando exigido, consentimento prévio.
      </p>
      <p>
        O usuário poderá configurar ou excluir cookies diretamente no navegador,
        ciente de que alguns recursos poderão deixar de funcionar.
      </p>
    </>
  );
}

function HolderRights() {
  return (
    <>
      <h2>Direitos do Titular</h2>
      <p>
        Nos termos da LGPD, o titular poderá solicitar, conforme aplicável:
      </p>
      <ul>
        <li>confirmação da existência de tratamento;</li>
        <li>acesso aos dados;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>informações sobre compartilhamentos;</li>
        <li>revogação do consentimento;</li>
        <li>eliminação dos dados tratados com consentimento, ressalvadas exceções legais;</li>
        <li>oposição e revisão, quando cabíveis;</li>
        <li>peticionamento perante a Autoridade Nacional de Proteção de Dados.</li>
      </ul>
      <p>
        Para proteger o próprio titular, poderá ser solicitada confirmação de
        identidade antes do atendimento. O canal informado é:
        <strong>pethaven.privacidade@gmail.com</strong>.
      </p>  
    </>
  );
}

export default function LegalCenter({ open, onClose }) {
  const [activeSection, setActiveSection] = useState("privacidade");

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = {
    privacidade: <PrivacyPolicy />,
    termos: <TermsOfUse />,
    consentimento: <ConsentTerms />,
    pesquisa: <ResearchUse />,
    cookies: <CookiesPolicy />,
    direitos: <HolderRights />,
  }[activeSection];

  return (
    <div
      className="legal-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="legal-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <header className="legal-modal__header">
          <div>
            <span>PetHaven</span>
            <h1 id="legal-modal-title">Central de Privacidade</h1>
            <p>LGPD, transparência e condições da pesquisa.</p>
          </div>

          <button
            type="button"
            className="legal-modal__close"
            onClick={onClose}
            aria-label="Fechar Central de Privacidade"
          >
            ×
          </button>
        </header>

        <div className="legal-modal__body">
          <nav className="legal-modal__nav" aria-label="Documentos jurídicos">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  activeSection === section.id
                    ? "legal-modal__tab legal-modal__tab--active"
                    : "legal-modal__tab"
                }
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <article className="legal-modal__content">{content}</article>
        </div>

        <footer className="legal-modal__footer">
          <small>
            Lei nº 13.709/2018 (LGPD) · Lei nº 12.965/2014 (Marco Civil da Internet)
          </small>
          <button type="button" onClick={onClose}>Entendi e fechar</button>
        </footer>
      </section>
    </div>
  );
}
