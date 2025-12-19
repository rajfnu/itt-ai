# InTimeTec AI Portal

A corporate portal with Role-Based Access Control (RBAC) and Conversational AI Agents for various departments.

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

**Backend:**
- FastAPI (Python)
- Pydantic for validation
- Swagger/OpenAPI documentation

## Project Structure

```
itt-ai/
├── app/                    # Next.js frontend (App Router)
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # Next.js API routes (optional)
├── backend/               # FastAPI backend
│   ├── main.py           # FastAPI app entry point
│   ├── models.py         # Pydantic models
│   ├── routers/          # API route handlers
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── hr.py         # HR department agents
│   │   ├── finance.py    # Finance department agents
│   │   ├── marketing.py  # Marketing department agents
│   │   ├── sales.py      # Sales department agents
│   │   └── engineering.py # Engineering department agents
│   └── requirements.txt  # Python dependencies
├── components/           # React components
├── lib/                  # Utilities and API client
└── md/                   # Project documentation
```

## Prerequisites

- Node.js 18+
- Python 3.9+
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajfnu/itt-ai.git
cd itt-ai
```

### 2. Setup Frontend

```bash
# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local

# Start the development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --host 0.0.0.0 --port 4000 --reload
```

Backend will be available at: **http://localhost:4000**

### 4. Access the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:4000 |
| Swagger Docs | http://localhost:4000/docs |
| ReDoc | http://localhost:4000/redoc |

## Demo Credentials

### C-Level Executives (Full Access)
| Role | Name | Email | Password |
|------|------|-------|----------|
| CEO | Jeet Kumar | jeet.kumar@intimetec.com | demo123 |
| CTO | Rakesh Sawan | rakesh.sawan@intimetec.com | demo123 |
| MD | Sandeep Jain | sandeep.jain@intimetec.com | demo123 |
| EVP | Dan Puga | dan.puga@intimetec.com | demo123 |
| EVP | Matt Fratzke | matt.fratzke@intimetec.com | demo123 |
| VP Tech | Cody Erben | cody.erben@intimetec.com | demo123 |
| CTO ANZ | Rajeev Kumar | rajeev.kumar@intimetec.com | demo123 |
| MD ANZ | Venkatesh Bachu | venkatesh.bachu@intimetec.com | demo123 |

### Department Staff
| Role | Name | Email | Password |
|------|------|-------|----------|
| IT Admin | Kuldeep Mathur | kuldeep.mathur@intimetec.com | demo123 |
| HR | HR Manager | hr@intimetec.com | demo123 |
| Finance | Finance Manager | finance@intimetec.com | demo123 |
| Marketing | Marketing Manager | marketing@intimetec.com | demo123 |
| Client Delivery | Vijaya Arucapalli | vijaya.arucapalli@intimetec.com | demo123 |
| Engineer | Ritesh Soni | ritesh.soni@intimetec.com | demo123 |

## Features

### Departments & AI Agents

**HR Department**
- Onboarding Assistant
- Leave Manager
- Performance Coach
- Recruitment Agent
- Policy Assistant

**Finance Department**
- Invoice Agent
- Expense Manager
- Budget Analyst
- Payroll Assistant
- Financial Reporter

**Marketing Department**
- Lead Generator
- Campaign Manager
- Content Creator
- Social Media Agent
- Marketing Analyst

**Sales Department**
- Capabilities Expert
- Deck Builder
- RFP Responder
- RFP Hunter
- Sales Coach

**Engineering Department**
- Training Assistant
- Knowledge Base (RAG)
- Code Reviewer
- Architecture Advisor
- DevOps Helper

### Role-Based Access Control (RBAC)

Each user role has access to specific departments:
- **CEO/CIO/COO**: All departments with executive-focused prompts
- **Admin**: All departments
- **HR Staff**: HR department
- **Finance Staff**: Finance department
- **Marketing Staff**: Marketing department
- **Sales Staff**: Sales department
- **Engineer**: Engineering department

### Executive Features

C-level executives (CEO, CIO, COO) get:
- **Executive Dashboard** with company-wide KPIs
- **Access to all department portals**
- **Executive-specific NLP prompts** tailored to each role:
  - CEO: Strategic & business performance queries
  - CIO: Technology & infrastructure queries
  - COO: Operations & efficiency queries

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:4000/docs
- **ReDoc**: http://localhost:4000/redoc

## Development

### Running both services concurrently

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 4000 --reload
```

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## License

MIT
