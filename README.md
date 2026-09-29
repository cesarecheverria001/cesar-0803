# 🐌 Snail Race Betting

Aplicación web full-stack desarrollada como prueba técnica para simular un sistema de recargas de saldo y visualización de información relacionada con apuestas en carreras de caracoles.

La aplicación permite registrar usuarios, iniciar y cerrar sesión, mantener una sesión activa mediante `localStorage`, consultar un dashboard con información simulada y realizar recargas de saldo mediante una API mock de SnailPay.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Recharts
- Vitest
- jsdom

## Backend

- Node.js
- Express
- TypeScript
- CORS
- Vitest
- Supertest
- tsx

## Herramientas de desarrollo

- Git
- GitHub
- Postman
- Visual Studio Code
- npm

---

# 📁 Arquitectura del proyecto

El proyecto está dividido en dos aplicaciones independientes:

```text
cesar-0803/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── snailpay.routes.ts
│   │   │
│   │   ├── services/
│   │   │   └── snailpay.service.ts
│   │   │
│   │   ├── types/
│   │   │   └── snailpay.types.ts
│   │   │
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── snailpay.controller.test.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBalanceModal.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── snailpay.service.ts
│   │   │   └── storage.service.ts
│   │   │
│   │   ├── types/
│   │   │   ├── snailpay.ts
│   │   │   └── user.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── vitest.config.ts
│
├── .gitignore
└── README.md