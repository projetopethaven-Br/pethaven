# PetHaven v2.1 — Pesquisa + Firestore

Este pacote organiza a gravação das respostas da pesquisa em três partes:

- `src/firebase.js`: conexão com o Firebase;
- `src/services/pesquisaService.js`: serviço responsável por salvar no Firestore;
- `src/pages/Pesquisa/Pesquisa.jsx`: formulário integrado ao serviço.

## Instalação

1. Extraia o ZIP.
2. Copie a pasta `src` para a raiz do projeto PetHaven.
3. Quando o Windows perguntar, confirme a substituição do `Pesquisa.jsx`.
4. No terminal do projeto, execute:

```bash
npm install firebase
npm run dev -- --host
```

## Estrutura no Firestore

Cada documento da coleção `pesquisas` será salvo assim:

- `empresa`
- `respostas`
- `lgpd`
- `metadata`

## Regras de segurança

Abra no Firebase:

`Firestore Database > Regras`

Substitua o conteúdo pelas regras do arquivo:

`firestore.rules.txt`

Depois clique em **Publicar**.

Essas regras permitem que a pesquisa pública crie novos documentos, mas impedem leitura, alteração ou exclusão pública.

## Teste

1. Preencha a pesquisa.
2. Marque o consentimento obrigatório.
3. Clique em **Enviar participação**.
4. Abra `Firestore Database > Dados`.
5. Verifique a coleção `pesquisas`.
