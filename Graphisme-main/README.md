# Graphisme by ELECTRON

<p align="center">
  <img src="https://img.shields.io/badge/Version-2026-Enterprise-gold?style=for-the-badge&labelColor=141414&color=FFD700" alt="Version">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

<p align="center">
  <a href="#vision">Vision</a> •
  <a href="#features">Fonctionnalités</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#getting-started">Installation</a> •
  <a href="#structure">Structure</a> •
  <a href="#contact">Contact</a>
</p>

---

## 🚀 Vision

**Graphisme by ELECTRON** est la première agence digitale intelligente fonctionnant avec une équipe d'Intelligences Artificielles collaboratives.

> *"Là où la créativité rencontre la technologie"*

Nous proposons une gamme complète de services digitaux avec un fonctionnement automatisé à plus de 90% grâce à nos agents IA spécialisés.

---

## ✨ Fonctionnalités

### 🌐 Site Web Premium

- **Page d'accueil spectaculaire** avec animations et effets visuels
- **Design responsive** et adaptatif (Mobile, Tablette, Desktop)
- **Glassmorphism** et effets néomorphiques
- **Animations fluides** avec Framer Motion et GSAP
- **Thème premium** Or, Noir, Blanc, Bleu électrique, Violet IA

### 🤖 Équipe IA (12 Agents)

| Agent | Fonction |
|-------|----------|
| CEO AI | Supervision et décisions stratégiques |
| Commercial AI | CRM et prospection |
| Marketing AI | SEO et campagnes publicitaires |
| Designer AI | Création graphique |
| Developer AI | Développement frontend/backend |
| Motion AI | Vidéo et animation |
| Community Manager AI | Gestion des réseaux sociaux |
| Finance AI | Facturation et comptabilité |
| Support AI | Assistance et tickets |
| DevOps AI | Infrastructure et CI/CD |
| CyberSecurity AI | Sécurité et audit |
| Data Analyst AI | Business Intelligence |

### 📊 Tableaux de Bord

- **Dashboard Administrateur** complet
- **Dashboard Client** personnalisé
- **Gestion des projets** en temps réel
- **Suivi des devis et factures**
- **Messagerie avec l'IA**

### 🔧 Services Proposés

- 🎨 Design Graphique (Logo, Identité visuelle, Charte graphique)
- 💻 Développement Web (Site vitrine, E-commerce, ERP, CRM, SaaS)
- 📱 Développement Mobile (Android, iOS, Flutter, React Native)
- 🧠 Intelligence Artificielle (Chatbots, Assistants IA, RAG, LLM)
- 🎬 Production Vidéo (Montage, Motion Design, Animation)
- 📈 Marketing Digital (SEO, SEA, Social Ads)
- ☁️ Cloud & DevOps (Docker, Kubernetes, CI/CD)
- 🛡️ Cybersécurité (Audit, Surveillance, Backups)

---

## 🛠️ Technologies

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **GSAP** - Animations avancées
- **Three.js** - 3D et particules

### Backend & Base de données
- **Node.js** - Runtime JavaScript
- **JSON File Storage** - Base de données locale (fichiers JSON)
- **API Routes Next.js** - Backend API

### IA & Automatisation
- **Ollama** - LLM local (llama3.2, llama3.1, qwen2.5, phi3)
- **12 Agents IA** - Chat en temps réel

### Infrastructure
- **Docker** - Conteneurisation
- **Traefik** - Reverse proxy
- **Prometheus** - Monitoring
- **Grafana** - Visualisation des données

---

## 🚦 Getting Started

### Prérequis

- Node.js 18+
- Ollama (pour l'IA)
- Git

### Installation Locale

```bash
# Cloner le projet
git clone https://github.com/IlarionDossouyovo/Graphisme.git
cd Graphisme

# Installer les dépendances
npm install

# Configurer les variables d'environnement
copy .env.example .env

# Lancer Ollama (dans un terminal séparé)
ollama serve

# Lancer en mode développement
npm run dev
```

### Lancer avec Docker

```bash
# Lancer l'application
docker-compose up -d
```

### URLs d'accès

| Service | URL |
|---------|-----|
| Application | http://localhost:3000 |
| Admin | http://localhost:3000/admin |
| Client | http://localhost:3000/client |
| Ollama API | http://localhost:11434 |

---

## 📁 Structure du Projet

```
Graphisme/
├── src/
│   ├── app/
│   │   ├── api/           # Routes API
│   │   │   ├── auth/     # Authentication
│   │   │   ├── chat/     # AI Chat
│   │   │   ├── projects/ # Projects CRUD
│   │   │   ├── quotes/   # Quotes CRUD
│   │   │   ├── invoices/ # Invoices CRUD
│   │   │   └── contact/  # Contact form
│   │   ├── admin/        # Admin dashboard
│   │   ├── client/       # Client dashboard
│   │   ├── login/        # Login page
│   │   ├── portfolio/    # Portfolio page
│   │   ├── ai-team/     # AI Team page
│   │   ├── pricing/      # Pricing page
│   │   ├── contact/      # Contact page
│   │   ├── services/     # Services page
│   │   ├── layout.tsx    # Main layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── lib/
│       ├── db/           # JSON Database
│       │   └── json-db.ts
│       ├── ai/           # AI Integration
│       │   └── ollama.ts
│       └── auth.ts       # NextAuth config
├── public/               # Static files
├── .github/workflows/   # GitHub Actions
├── .env.example         # Environment template
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 Design System

### Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Or | #FFD700 | Éléments premium, CTA |
| Noir | #0A0A0A | Fond principal |
| Blanc | #FFFFFF | Texte, accents |
| Bleu Électrique | #00D4FF | Innovation, tech |
| Violet IA | #8B5CF6 | Intelligence Artificielle |

### Typographie

- **Display**: Playfair Display
- **Body**: Inter

---

## 📞 Contact

**Graphisme by ELECTRON**

- 📞 +229 01 97 70 03 47
- 📞 +229 01 49 80 22 02
- 📧 electronbusiness07@gmail.com
- 📍 Cotonou, Benin

---

<p align="center">
  <strong>Fait avec ❤️ et l'IA</strong><br>
  © 2026 Graphisme by ELECTRON
</p>
