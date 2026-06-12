<center><h1>H-Trace </h1>  </center>
<div align="center">
AI‑Driven Threat Intelligence Platform for Tunisian Cyberspace

https://github.com/Safwen-amaira/H-Trace/actions/workflows/ci.yml/badge.svg
https://img.shields.io/badge/License-CC%2520BY--NC--ND%25204.0-red.svg
https://img.shields.io/badge/Made%2520in-Tunisia-red.svg

</div>
🌍 Overview
H‑Trace is a specialised threat intelligence sharing platform focused on threats targeting Tunisia’s digital ecosystem.
It combines a MISP‑like collaborative approach with AI‑driven analysis, real‑world threat feeds, and fine‑grained access control based on subscription plans.

Built from the ground up without external frameworks like MISP, H‑Trace is a fully modular microservice platform designed for Tunisian SOC teams, CERT‑TN partners, and cybersecurity researchers.

✨ Key Features
🤖 AI‑Driven – NLP models (upcoming) for Arabic/French threat reports, automatic IOC extraction, and threat classification.

🇹🇳 Tunisia Focus – Monitors .tn domains, Tunisian IP ranges, and local threat actors.

📡 Real Threat Feeds – Integrates AbuseIPDB, URLhaus, and PhishTank (configurable via .env).

👥 Multi‑Tenant Plans – Free, Pro, and Enterprise tiers with rate limiting and source gating.

🛡️ Role‑Based Access – Admin, Hanicar Team, and regular users.

🎛️ Admin Dashboard – Manage users, change plans, and view platform statistics.

💎 Modern UI – React + Vite + Three.js interactive globe, Tailwind CSS, and responsive design.

🐳 Microservices Architecture – Auth, Threat Intel, Source Connector, API Gateway, all Dockerised.

🔒 Security First – JWT authentication, plan enforcement, Redis‑backed rate limiting, CORS, and secret management.

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