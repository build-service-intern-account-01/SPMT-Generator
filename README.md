# SPMT Generator

**Transformez le chaos en prompts structurés**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success.svg)](https://axiorix.github.io/spmt-generator/)

## 🚀 Déploiement

[![Deploy Status](https://img.shields.io/github/actions/workflow/status/build-service-intern-account-01/SPMT-Generator/deploy.yml?branch=main&label=deploy&logo=github)](https://github.com/build-service-intern-account-01/SPMT-Generator/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-success?logo=vercel)](https://build-service-intern-account-01.github.io/SPMT-Generator/)

**Production:** [https://build-service-intern-account-01.github.io/SPMT-Generator/](https://build-service-intern-account-01.github.io/SPMT-Generator/)

Déploiement automatique via GitHub Actions sur GitHub Pages. Chaque push sur `main` déclenche un build et un déploiement.

## 📖 Aperçu / Overview

**FR:** SPMT Generator (Schema & Prompt Mode Transformer) est un outil web qui transforme automatiquement du texte brut et désordonné en prompts JSON structurés et optimisés pour les LLMs. Il détecte intelligemment le type de contenu (opérationnel, créatif, analytique ou conversationnel) et génère un prompt avec le schéma approprié.

**EN:** SPMT Generator is a web tool that automatically transforms raw, unstructured text into structured, LLM-optimized JSON prompts. It intelligently detects content type (operational, creative, analytical, or conversational) and generates a prompt with the appropriate schema.

## ✨ Fonctionnalités / Features

- 🧠 **Détection automatique** du type de contenu via analyse de mots-clés
- 📋 **4 schémas prédéfinis** : Opérationnel, Créatif, Analytique, Conversationnel
- ✨ **Génération instantanée** de prompts structurés en JSON
- 🎨 **Interface moderne** avec glassmorphism et animations fluides
- 📱 **100% responsive** : desktop, tablette, mobile
- 🔒 **Aucune API externe** : traitement 100% côté client
- 📋 **Copie en un clic** vers le presse-papiers
- 💡 **Exemples intégrés** pour démarrer rapidement
- ⌨️ **Raccourcis clavier** : Ctrl/Cmd+Enter (générer), Ctrl/Cmd+K (effacer)
- 🌐 **Interface entièrement en français**

## 🛠️ Stack Technique

- **React 18** - Framework UI avec hooks
- **TypeScript 5.5** - Typage strict
- **Vite 5.4** - Build tool ultra-rapide
- **Tailwind CSS 3.4** - Styling utility-first
- **Lucide React** - Icônes modernes
- **GitHub Actions** - CI/CD automatisé
- **GitHub Pages** - Hébergement statique

## 📥 Installation

```bash
# Cloner le dépôt
git clone https://github.com/axiorix/spmt-generator.git
cd spmt-generator

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 🚀 Build

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 📖 Utilisation / Usage

1. **Coller votre texte** dans la zone "Texte Brut" (minimum 20 mots recommandé)
2. **Cliquer sur "Générer Prompt"** ou appuyer sur Ctrl/Cmd+Enter
3. Le système **détecte automatiquement** le type de contenu
4. Un **prompt JSON structuré** est généré avec le schéma approprié
5. **Copier le JSON** en un clic pour l'utiliser avec votre LLM préféré
6. Consulter l'**explication détaillée** pour comprendre la classification

### Raccourcis Clavier

- `Ctrl/Cmd + Enter` : Générer le prompt
- `Ctrl/Cmd + K` : Effacer tout

## 📚 Exemples

### 1. Type OPÉRATIONNEL 🔧

**Input:** "Erreur 500 sur API produits après mise à jour serveur. Service redémarré, vérifier stabilité, rollback si besoin."

**Output JSON:**
```json
{
  "type": "OPERATIONAL",
  "prompt": "RÔLE : Ingénieur Système Senior...",
  "schema_used": "Schéma OPÉRATIONNEL avec diagnostic, actions, tests, rollback"
}
```

### 2. Type CRÉATIF ��

**Input:** "Nouvelle campagne marketing pour lancement produit. Concept visuel innovant avec storytelling fort."

**Output JSON:**
```json
{
  "type": "CREATIVE",
  "prompt": "RÔLE : Stratège Créatif Senior...",
  "schema_used": "Schéma CRÉATIF avec concept, développement, variantes"
}
```

### 3. Type ANALYTIQUE 📊

**Input:** "Analyse des données Q3 montre corrélation entre engagement utilisateur et conversion."

**Output JSON:**
```json
{
  "type": "ANALYTICAL",
  "prompt": "RÔLE : Analyste de Données Senior...",
  "schema_used": "Schéma ANALYTIQUE avec synthèse, découvertes, preuves"
}
```

### 4. Type CONVERSATIONNEL 💬

**Input:** "Je cherche des conseils pour améliorer notre workflow de développement."

**Output JSON:**
```json
{
  "type": "CONVERSATIONAL",
  "prompt": "RÔLE : Consultant Expert et Conseiller...",
  "schema_used": "Schéma CONVERSATIONNEL avec compréhension, perspectives, recommandations"
}
```

## 📂 Arborescence du Projet

```
spmt-generator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Actions
├── src/
│   ├── components/
│   │   ├── Header.tsx          # En-tête de l'application
│   │   ├── InputZone.tsx       # Zone de saisie de texte
│   │   ├── JsonOutput.tsx      # Affichage du JSON généré
│   │   ├── ExamplesPanel.tsx   # Panneau des exemples
│   │   └── Footer.tsx          # Pied de page
│   ├── utils/
│   │   ├── detector.ts         # Détection du type de contenu
│   │   ├── templates.ts        # Templates de prompts par type
│   │   ├── examples.ts         # Exemples prédéfinis
│   │   └── types.ts            # Définitions TypeScript
│   ├── App.tsx                 # Composant racine
│   ├── main.tsx                # Point d'entrée
│   └── index.css               # Styles globaux
├── public/
│   └── vite.svg                # Favicon
├── .eslintrc.cjs               # Configuration ESLint
├── .gitignore                  # Fichiers ignorés par Git
├── LICENSE                     # Licence MIT
├── README.md                   # Documentation
├── index.html                  # Template HTML
├── package.json                # Dépendances npm
├── postcss.config.js           # Configuration PostCSS
├── tailwind.config.js          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── tsconfig.app.json           # Config TS app
├── tsconfig.node.json          # Config TS Node
└── vite.config.ts              # Configuration Vite
```

## 📜 Scripts npm

```bash
npm run dev        # Serveur de développement (port 5173)
npm run build      # Build de production
npm run preview    # Prévisualiser le build
npm run lint       # Linter ESLint
npm run typecheck  # Vérification TypeScript
```

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👤 À propos

**SPMT Generator** a été créé par **Axiorix** pour faciliter la création de prompts structurés destinés aux LLMs. ☕

---

<div align="center">

💡 Propulsé par React, TypeScript & Tailwind CSS  
by [**Axiorix**](https://www.axiorix.com)

[![Portfolio](https://img.shields.io/badge/🌐_AXIORIX.COM-1E1E1E?style=for-the-badge&logo=vercel&logoColor=38B2AC)](https://www.axiorix.com)

</div>

---

Made with care to showcase technical expertise in modern web development.
