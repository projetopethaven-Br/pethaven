import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Mercado.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import StatCard from "../../components/StatCard/StatCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import DataTable from "../../components/DataTable/DataTable";

import {
  CampaignRounded,
  GroupsRounded,
  HandshakeRounded,
  LocationOnRounded,
  VisibilityRounded,
  RefreshRounded,
} from "@mui/icons-material";

import { obterIndicadores } from "../../services/mercadoService";

function normalizarTexto(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatarData(timestamp) {
  if (!timestamp) return "Não informada";

  try {
    const data =
      typeof timestamp.toDate === "function"
        ? timestamp.toDate()
        : new Date(timestamp);

    if (Number.isNaN(data.getTime())) {
      return "Não informada";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(data);
  } catch {
    return "Não informada";
  }
}

function obterStatus(pesquisa) {
  if (pesquisa?.crm?.status) {
    return pesquisa.crm.status;
  }

  if (pesquisa?.respostas?.beta === "Sim") {
    return "Parceiro Beta";
  }

  if (pesquisa?.respostas?.interesse === "Sim") {
    return "Interessado";
  }

  if (pesquisa?.respostas?.interesse === "Talvez") {
    return "Potencial";
  }

  return "Novo Lead";
}

function obterClasseStatus(status) {
  const normalizado = normalizarTexto(status);

  if (normalizado === "parceiro beta") {
    return "mercado-status mercado-status--beta";
  }

  if (normalizado === "interessado") {
    return "mercado-status mercado-status--interessado";
  }

  if (normalizado === "cliente") {
    return "mercado-status mercado-status--cliente";
  }

  if (normalizado === "potencial") {
    return "mercado-status mercado-status--potencial";
  }

  return "mercado-status mercado-status--novo";
}

export default function Mercado() {
  const [busca, setBusca] = useState("");

  const [dados, setDados] = useState({
    total: 0,
    interessados: 0,
    beta: 0,
    estados: 0,
    pesquisas: [],
  });

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const resultado = await obterIndicadores();

      setDados(resultado);
    } catch (error) {
      console.error("Erro ao carregar o Mercado:", error);

      setErro(
        "Não foi possível carregar as pesquisas. Verifique sua conexão e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const pesquisasFiltradas = useMemo(() => {
    const termo = normalizarTexto(busca);

    if (!termo) {
      return dados.pesquisas;
    }

    return dados.pesquisas.filter((pesquisa) => {
      const empresa = pesquisa?.empresa || {};
      const respostas = pesquisa?.respostas || {};

      const camposPesquisaveis = [
        empresa.estabelecimento,
        empresa.responsavel,
        empresa.cidade,
        empresa.estado,
        empresa.tipo,
        empresa.whatsapp,
        empresa.email,
        respostas.interesse,
        respostas.beta,
        obterStatus(pesquisa),
      ];

      return camposPesquisaveis.some((campo) =>
        normalizarTexto(campo).includes(termo)
      );
    });
  }, [busca, dados.pesquisas]);

 function visualizarEmpresa(pesquisa) {
    console.log("MERCADO NOVO", pesquisa.id);
    navigate(`/mercado/${pesquisa.id}`);
}

  return (
    <div className="mercado-page">
      <PageHeader
        title="Mercado"
        subtitle="Acompanhe os leads, interessados e parceiros beta gerados pela pesquisa da PetHaven."
        actions={
          <button
            type="button"
            className="mercado-refresh"
            onClick={carregarDados}
            disabled={carregando}
          >
            <RefreshRounded />

            {carregando ? "Atualizando..." : "Atualizar"}
          </button>
        }
      />

      {erro && (
        <div className="mercado-error">
          <strong>Não foi possível carregar os dados.</strong>
          <span>{erro}</span>

          <button type="button" onClick={carregarDados}>
            Tentar novamente
          </button>
        </div>
      )}

      <div className="mercado-cards">
        <StatCard
          icon={CampaignRounded}
          title="Leads recebidos"
          value={carregando ? "..." : dados.total}
          subtitle="Empresas que responderam"
          color="blue"
        />

        <StatCard
          icon={GroupsRounded}
          title="Interessados"
          value={carregando ? "..." : dados.interessados}
          subtitle='Responderam "Sim"'
          color="purple"
        />

        <StatCard
          icon={HandshakeRounded}
          title="Parceiros Beta"
          value={carregando ? "..." : dados.beta}
          subtitle="Aceitaram testar o sistema"
          color="green"
        />

        <StatCard
          icon={LocationOnRounded}
          title="Estados"
          value={carregando ? "..." : dados.estados}
          subtitle="Estados alcançados"
          color="orange"
        />
      </div>

      <section className="mercado-table-section">
        <div className="mercado-table-header">
          <div>
            <span className="mercado-table-header__eyebrow">
              CRM PetHaven
            </span>

            <h2>Empresas e oportunidades</h2>

            <p>
              Cada empresa que responde à pesquisa entra automaticamente como
              um novo lead.
            </p>
          </div>

          <div className="mercado-search">
            <SearchBox
              value={busca}
              onChange={setBusca}
              placeholder="Pesquisar empresa, cidade ou responsável..."
            />
          </div>
        </div>

        {carregando ? (
          <div className="mercado-loading">
            Carregando empresas...
          </div>
        ) : pesquisasFiltradas.length === 0 ? (
          <div className="mercado-empty">
            <CampaignRounded />

            <h3>
              {busca
                ? "Nenhuma empresa encontrada"
                : "Nenhuma pesquisa recebida"}
            </h3>

            <p>
              {busca
                ? "Tente pesquisar utilizando outro nome, cidade ou estado."
                : "Quando uma empresa enviar a pesquisa pública, ela aparecerá aqui automaticamente."}
            </p>
          </div>
        ) : (
          <DataTable
            columns={[
              "Empresa",
              "Cidade",
              "UF",
              "Tipo",
              "Status",
              "Interesse",
              "Beta",
              "Data",
              "Visualizar",
            ]}
          >
            {pesquisasFiltradas.map((pesquisa) => {
              const empresa = pesquisa?.empresa || {};
              const respostas = pesquisa?.respostas || {};
              const status = obterStatus(pesquisa);

              return (
                <tr key={pesquisa.id}>
                  <td>
                    <div className="mercado-company">
                      <span className="mercado-company__avatar">
                        {(empresa.estabelecimento || "P")
                          .charAt(0)
                          .toUpperCase()}
                      </span>

                      <div>
                        <strong>
                          {empresa.estabelecimento ||
                            "Estabelecimento sem nome"}
                        </strong>

                        <small>
                          {empresa.responsavel ||
                            "Responsável não informado"}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>{empresa.cidade || "—"}</td>

                  <td>{empresa.estado || "—"}</td>

                  <td>{empresa.tipo || "—"}</td>

                  <td>
                    <span className={obterClasseStatus(status)}>
                      {status}
                    </span>
                  </td>

                  <td>{respostas.interesse || "—"}</td>

                  <td>{respostas.beta || "—"}</td>

                  <td>
                    {formatarData(pesquisa?.metadata?.criadoEm)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="mercado-view-button"
                      onClick={() => visualizarEmpresa(pesquisa)}
                    >
                      <VisibilityRounded />

                      Ver
                    </button>
                  </td>
                </tr>
              );
            })}
          </DataTable>
        )}

        {!carregando && pesquisasFiltradas.length > 0 && (
          <div className="mercado-table-footer">
            Exibindo <strong>{pesquisasFiltradas.length}</strong> de{" "}
            <strong>{dados.total}</strong>{" "}
            {dados.total === 1 ? "empresa" : "empresas"}
          </div>
        )}
      </section>
    </div>
  );
}