# 🛡️ H-Trace

<div align="center">

**AI-Driven Threat Intelligence Platform for Tunisian Cyberspace**

[![CI](https://github.com/Safwen-amaira/H-Trace/actions/workflows/ci.yml/badge.svg)](https://github.com/Safwen-amaira/H-Trace/actions/workflows/ci.yml)
![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red.svg)
![Made in Tunisia](https://img.shields.io/badge/Made%20in-Tunisia-red.svg)

</div>

---

## 🌍 Overview

**H-Trace** is a specialized threat intelligence sharing platform focused on protecting Tunisia’s digital ecosystem.

It combines a **MISP-like collaborative intelligence model** with **AI-driven analysis**, real-world threat feeds, and **fine-grained multi-tenant access control**.

It is built from scratch as a modular microservice platform for:

- 🇹🇳 Tunisian SOC teams  
- 🛡️ CERT-TN partners  
- 🔬 Cybersecurity researchers  
- 🧠 Threat intelligence analysts  

---

## ✨ Key Features

### 🤖 AI-Driven Intelligence
- IOC extraction (future NLP support for Arabic & French)
- Automatic threat classification
- Smart enrichment pipeline

### 🇹🇳 Tunisia-Centric Monitoring
- `.tn` domain tracking
- Tunisian IP ranges
- Local threat actor focus

### 📡 Real Threat Feeds
- AbuseIPDB  
- URLhaus  
- PhishTank  
(Configurable via `.env`)

### 👥 Multi-Tenant Subscription System
- Free / Pro / Enterprise plans
- Feature gating per plan
- Rate limiting per tier

### 🛡️ Role-Based Access Control
- Admin (full system control)
- Hanicar Team (developer tools)
- Users (plan-based access)

### 🎛️ Admin Dashboard
- User & subscription management
- System analytics
- Threat feed control

### 💎 Modern UI
- React + Vite frontend
- TailwindCSS
- Three.js interactive threat globe

### 🧱 Microservices Architecture
- API Gateway (FastAPI)
- Auth Service
- Threat Intelligence Service
- Source Connector Service
- Fully Dockerized ecosystem

### 🔒 Security First
- JWT authentication
- Redis rate limiting
- Plan enforcement at gateway
- Secure secrets management
- CORS protection

---

## 🏗️ Architecture

🧱 Architecture
```bash
┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│ API Gateway  │
│ (React/Vite) │     │  (FastAPI)   │
└──────────────┘     └──────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
 ┌──────▼──────┐   ┌───────▼───────┐   ┌───────▼──────┐
 │ Auth Service │   │ Threat Intel │   │ Source Conn. │
 │  (FastAPI)   │   │   Service    │   │   Service    │
 └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
        │                  │                  │
 ┌──────▼──────┐   ┌──────▼──────┐   ┌───────▼──────┐
 │ PostgreSQL  │   │ PostgreSQL  │   │   Redis +    │
 │   (users)   │   │  + Elastic  │   │ External APIs│
 └─────────────┘   └─────────────┘   └──────────────┘
 ```
All services are containerised with Docker / Podman Compose.

🚀 Quick Start
Prerequisites
Docker and docker compose, or Podman with podman-compose

Python 3.11+ (if running outside containers)

Node.js 20+ (for frontend development)

1. Clone the repository
bash
git clone https://github.com/Safwen-amaira/H-Trace.git
cd H-Trace
2. Configure environment variables
bash
cp .env.example .env
nano .env
3. Start the platform
bash
# Using Docker
docker compose up -d --build

# Or using Podman
podman-compose up -d --build
4. Access the services
Component	URL
Frontend	http://localhost:3000
API Gateway	http://localhost:8000/docs
Auth Service	http://localhost:8001/docs
Threat Intel	http://localhost:8002/docs
Source Conn.	http://localhost:8003/docs
👤 User Roles & Plans
Role	Permissions
Admin	Full control: manage users, plans, sources
Hanicar Team	Developer access: manage source connectors, API keys
User	Access threat intel based on subscribed plan
Plan	Sources	Rate Limit (req/min)	Features
Free	URLhaus	10	IOC search, view
Pro	URLhaus + AbuseIPDB	60	IOC export, basic sharing
Enterprise	All enabled	600	Sharing circles, API access, custom sources
🔌 Threat Feeds & .env Configuration
Threat sources are controlled entirely via .env, never exposed in the codebase.
Example .env:

text
THREAT_SOURCES=["abuseipdb","urlhaus","phishtank"]
ABUSEIPDB_API_KEY=your_key_here
PHISHTANK_API_KEY=your_key_here
FETCH_INTERVAL=3600
Only enabled sources are fetched, and plan‑based filtering ensures users see only what they are allowed to.

🧪 Development & Testing
Each backend service can be developed individually.
We use feature branches and pull requests for all changes.
CI/CD (GitHub Actions) runs linting, tests, and Docker builds on every push.

bash
# Run backend linting
flake8 backend/

# Run frontend
cd frontend && npm run dev
📈 Roadmap
Auth service with JWT, roles, plans

Threat Intel service (IOC CRUD)

Source connector with real external feeds

API Gateway with rate limiting & plan enforcement

Modern React frontend with 3D globe

Admin dashboard & user management

AI engine for IOC extraction from Arabic/French reports

CERT‑TN integration

Mobile application

Premium threat feeds & reports

🤝 Contributing
We welcome contributions from the Tunisian cybersecurity community!
Please read our Contributing Guidelines and create a pull request.

⚖️ License
This project is licensed under Creative Commons Attribution‑NonCommercial‑NoDerivatives 4.0 International (CC BY‑NC‑ND 4.0).
You may view and learn from the code, but you cannot modify, distribute, or use it commercially without explicit permission.
See LICENSE for full details.

<div align="center">
Created by Hanicar Security : https://hanicar.tn

</div>
