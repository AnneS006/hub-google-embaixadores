---
description: Firebase do zero ao deploy — plano Spark gratuito, Firestore, Authentication, Security Rules, Emulator Suite e controle de custos.
order: 1
---

# 🔥 Firebase

O **Firebase** é a plataforma de backend do Google: autenticação, banco de dados em tempo real, hospedagem e storage prontos para usar a partir do front-end. O plano **Spark** é gratuito, basta uma conta Google e **não exige verificação de estudante**.

> Limites conferidos em setembro de 2026 na [página de preços do Firebase](https://firebase.google.com/pricing).

## 📋 Resumo do plano Spark (gratuito)

| Produto | Limite gratuito |
| --- | --- |
| Authentication | 50 mil usuários ativos/mês (50 para SAML/OIDC); SMS do login por telefone é cobrado |
| Cloud Firestore | 1 GiB armazenado; 50 mil leituras, 20 mil escritas e 20 mil exclusões **por dia** |
| Realtime Database | 1 GB armazenado; 10 GB/mês de download; 100 conexões simultâneas |
| Hosting | 10 GB armazenados; 360 MB/dia de transferência |
| Cloud Storage | 5 GB e 1 GB/dia de download em buckets legados `*.appspot.com`; buckets novos exigem o plano Blaze |
| Cloud Functions e App Hosting | ❌ Exigem o plano Blaze (pago conforme o uso) |

## 🟢 Nível 1 — Primeiros passos

### Conceitos

- **Projeto:** o "contêiner" de tudo. Um projeto pode ter vários apps (web, Android, iOS).
- **Firestore:** banco NoSQL. Os dados ficam em **coleções** (`tarefas`) que contêm **documentos** (`tarefas/abc123`), e cada documento é um objeto com campos.
- **Authentication:** cadastro e login com e-mail/senha, Google, GitHub e outros provedores, sem você guardar senhas.
- **Security Rules:** regras que dizem quem pode ler e escrever cada documento. São elas — e não esconder a configuração — que protegem seus dados.

### Criando o projeto

1. Acesse o [Firebase Console](https://console.firebase.google.com/) e clique em **Criar projeto**.
2. Dê um nome e (opcional) desative o Google Analytics para simplificar.
3. Na visão geral, clique no ícone **Web (`</>`)** para registrar um app. Copie o objeto `firebaseConfig`.
4. Em **Build → Authentication**, ative o provedor **Google** ou **E-mail/senha**.
5. Em **Build → Firestore Database**, crie o banco em **modo de produção** e escolha a região (`southamerica-east1` é São Paulo).

> ⚠️ Evite o "modo de teste": ele deixa o banco aberto para qualquer pessoa por 30 dias.

## 🟡 Nível 2 — Mão na massa: lista de tarefas com login

Instale o SDK:

```bash
npm install firebase
```

Configuração (`src/lib/firebase.ts`). Esses valores **podem** ficar no front-end — eles só identificam o projeto:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  appId: "...",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
```

Login com Google:

```ts
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const entrar = () => signInWithPopup(auth, new GoogleAuthProvider());
export const sair = () => signOut(auth);
```

CRUD no Firestore, guardando o dono de cada tarefa:

```ts
import {
  addDoc, collection, deleteDoc, doc, onSnapshot,
  orderBy, query, serverTimestamp, updateDoc, where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const tarefas = collection(db, "tarefas");

export function criarTarefa(titulo: string) {
  return addDoc(tarefas, {
    titulo,
    feita: false,
    dono: auth.currentUser!.uid,
    criadaEm: serverTimestamp(),
  });
}

// Escuta em tempo real só as tarefas do usuário logado
export function ouvirTarefas(uid: string, callback: (lista: unknown[]) => void) {
  const q = query(tarefas, where("dono", "==", uid), orderBy("criadaEm", "desc"));
  return onSnapshot(q, (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}

export const concluir = (id: string) => updateDoc(doc(db, "tarefas", id), { feita: true });
export const apagar = (id: string) => deleteDoc(doc(db, "tarefas", id));
```

> 💡 A consulta com `where` + `orderBy` em campos diferentes precisa de um **índice composto**. Na primeira execução, o erro no console traz um link que cria o índice com um clique.

### Security Rules para esse app

Em **Firestore → Regras**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tarefas/{tarefaId} {
      allow read, update, delete: if request.auth != null
                                  && resource.data.dono == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.dono == request.auth.uid
                    && request.resource.data.titulo is string
                    && request.resource.data.titulo.size() <= 200;
    }
  }
}
```

Leitura: só o dono lê, edita e apaga. Na criação, o campo `dono` precisa ser o próprio usuário e o título tem no máximo 200 caracteres.

## 🔴 Nível 3 — Produção e boas práticas

### Firebase CLI e Emulator Suite

Desenvolva sem gastar a cota diária e sem tocar nos dados reais:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore hosting emulators
firebase emulators:start      # Firestore, Auth e Hosting locais + painel em localhost:4000
```

Conecte o app ao emulador só em desenvolvimento:

```ts
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
```

### Teste suas regras

Use o pacote `@firebase/rules-unit-testing` com o emulador para escrever testes do tipo "um usuário **não** consegue ler a tarefa de outro". Rode esses testes no [GitHub Actions](../dev-tools/github-actions.md) a cada PR.

### Modelagem para NoSQL

- **Desenhe as consultas antes das coleções.** No Firestore, você modela pelo jeito que vai ler.
- **Duplicar dados é normal** (por exemplo, guardar o nome do autor dentro do post) para evitar várias leituras.
- **Documentos têm limite de 1 MiB.** Listas que crescem sem parar devem virar subcoleções.
- **Cuidado com leituras:** cada documento retornado conta como uma leitura. Use `limit()` e paginação com `startAfter()`.

### Deploy

```bash
npm run build
firebase deploy --only hosting,firestore:rules
```

O Firebase Hosting tem uma GitHub Action oficial que publica um preview para cada PR (`firebase init hosting:github`).

### Se precisar do plano Blaze

O Blaze mantém as mesmas cotas gratuitas do Spark e cobra só o que passar. Antes de mudar:

1. Crie um **alerta de orçamento** no Google Cloud Billing (por exemplo, R$ 10). O alerta avisa, mas **não bloqueia** gastos.
2. Ative o **App Check** para impedir que outros apps usem seu backend.
3. Revise as regras de segurança — com Blaze, um abuso vira cobrança.

## 🔗 Links oficiais

- [Firebase Console](https://console.firebase.google.com/)
- [Preços do Firebase](https://firebase.google.com/pricing)
- [Documentação do Firestore](https://firebase.google.com/docs/firestore)
- [Introdução às Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Emulator Suite](https://firebase.google.com/docs/emulator-suite)
