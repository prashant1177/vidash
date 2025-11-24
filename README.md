# Virtual Workplace System
A productivity workspace for solo founders and self-employed professionals.  
This project includes a Node.js/Express backend and a separate frontend application.

## Prerequisites
- Node.js (LTS recommended)  
- npm or yarn  
- A Supabase project (for database and auth)

---

## Backend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend root directory with the following variables:

```
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-service-role-key>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Ensure these values come from your Supabase project dashboard.

### 3. Start the Backend Server
```bash
node index.js
```

The backend will start on the configured port (default is often `3000` unless manually changed).

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The frontend typically runs at `http://localhost:5173` or a similar port depending on your framework.

---

## Project Structure (High-Level)
```
/backend
  index.js
  package.json
  .env

/frontend
  src/
  package.json
```

---

## Developer Notes
- Ensure the backend URL is correctly configured in the frontend environment settings.  
- Any new database tables or Supabase functions should be documented to maintain consistency across environments.  
- Consider adding scripts for linting, formatting, or API testing as the project grows.
