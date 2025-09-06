## Running the Project with Docker

This project is fully containerized using Docker and Docker Compose, with separate services for the backend (Node.js API) and frontend (Vite + Nginx). Follow these instructions to build and run the application:

### Project-Specific Requirements
- **Node.js Version:** Both backend and frontend require Node.js `22.13.1` (as specified in the Dockerfiles).
- **Frontend Production Server:** Uses Nginx `1.25.2-alpine`.

### Environment Variables
- The backend supports environment variables via a `.env` file. An example file is provided at `backend/.env.example`. If you need custom environment variables, copy this file to `backend/.env` and adjust as needed.
- The Docker Compose file includes a commented `env_file` line for the backend. Uncomment it if you create a `.env` file.

### Build and Run Instructions
1. **(Optional) Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env` and edit as needed.
2. **Build and start the services:**
   - Run:
     ```sh
     docker compose up --build
     ```
   - This will build and start both the backend and frontend containers.

### Service Ports
- **Backend (js-backend):** Exposes port `4000` (mapped to host `4000`).
- **Frontend (js-frontend):** Exposes port `80` (mapped to host `80`).

### Special Configuration
- Both services run as non-root users for improved security.
- The frontend build uses Vite and is served by Nginx in production.
- The backend uses a custom user and exposes `NODE_ENV=production` and increased memory limits via `NODE_OPTIONS`.
- Both services are connected via a custom Docker network (`appnet`).
- The frontend depends on the backend service (declared in `depends_on`).

---

You can now access:
- The frontend at [http://localhost:80](http://localhost:80)
- The backend API at [http://localhost:4000](http://localhost:4000)

Refer to the provided Dockerfiles and `docker-compose.yaml` for further customization.