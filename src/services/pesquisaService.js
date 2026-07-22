import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const COLECAO_PESQUISAS = "pesquisas";

/**
 * Salva uma resposta da pesquisa no Firestore.
 * O Firestore cria automaticamente o ID do documento.
 */
export async function salvarPesquisa(pesquisa) {
  if (!pesquisa?.empresa?.estabelecimento) {
    throw new Error("Nome do estabelecimento não informado.");
  }

  if (!pesquisa?.lgpd?.aceitouPolitica) {
    throw new Error("Consentimento obrigatório não informado.");
  }

  const documento = {
    ...pesquisa,

    lgpd: {
      ...pesquisa.lgpd,
      consentimentoRegistradoEm: serverTimestamp(),
    },

    metadata: {
      ...pesquisa.metadata,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    },
  };

  const referencia = await addDoc(
    collection(db, COLECAO_PESQUISAS),
    documento
  );

  return referencia.id;
}
