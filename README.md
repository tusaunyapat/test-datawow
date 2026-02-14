## Installation & Setup

To get the entire environment (Frontend, Backend, and Database) up and running quickly using **Docker**, follow these steps:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-name>
```
### 2. Run the project
Execute the following command in the root directory. This will build the images and start the containers in one go:
```
docker-compose up --build
```
### 3. Access the Application
Once the containers are healthy, you can access the services at:
```
Frontend: http://localhost:3000

Backend API: http://localhost:3001
```
## Project Structure
```
datawow
├─ .DS_Store
├─ README.md
├─ backend
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ main.ts
│  │  └─ modules
│  │     ├─ concerts
│  │     │  ├─ concerts.controller.spec.ts
│  │     │  ├─ concerts.controller.ts
│  │     │  ├─ concerts.module.ts
│  │     │  ├─ concerts.service.spec.ts
│  │     │  ├─ concerts.service.ts
│  │     │  ├─ dto
│  │     │  │  ├─ create-concert.dto.ts
│  │     │  │  └─ update-concert.dto.ts
│  │     │  └─ entities
│  │     │     └─ concert.entity.ts
│  │     └─ reservations
│  │        ├─ dto
│  │        │  ├─ create-reservation.dto.ts
│  │        │  └─ update-reservation.dto.ts
│  │        ├─ entities
│  │        │  └─ reservation.entity.ts
│  │        ├─ reservations.controller.spec.ts
│  │        ├─ reservations.controller.ts
│  │        ├─ reservations.module.ts
│  │        ├─ reservations.service.spec.ts
│  │        └─ reservations.service.ts
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
├─ docker-compose.yml
└─ frontend
   ├─ Dockerfile
   ├─ README.md
   ├─ eslint.config.mjs
   ├─ next-env.d.ts
   ├─ next.config.ts
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ public
   ├─ src
   │  └─ app
   │     ├─ .env
   │     ├─ .env.example
   │     ├─ api
   │     │  ├─ concert.ts
   │     │  └─ reservation.ts
   │     ├─ common_variable.ts
   │     ├─ components
   │     │  ├─ AdminTools.tsx
   │     │  ├─ BaseCard.tsx
   │     │  ├─ Callout.tsx
   │     │  ├─ CalloutContainer.tsx
   │     │  ├─ ConcertCard.tsx
   │     │  ├─ CreateConcert.tsx
   │     │  ├─ History.tsx
   │     │  ├─ Homepage.tsx
   │     │  ├─ Overview.tsx
   │     │  ├─ UserConcertCard.tsx
   │     │  ├─ UserConcertContainer.tsx
   │     │  └─ sidebar.tsx
   │     ├─ context
   │     │  └─ AppContext.tsx
   │     ├─ favicon.ico
   │     ├─ globals.css
   │     ├─ layout.tsx
   │     ├─ page.tsx
   │     └─ type.ts
   └─ tsconfig.json

```

## Library Usage
- Frontend: NextJs with Typescript
- Backend: NestJs
- CSS Framework: MUI, Tailwind, Swal
- Database: Postgres
- Others: React-icons
- Orchestration: Docker



## Testing
The backend is equipped with unit and integration tests to ensure system reliability and data integrity.

Run Coverage Test
To run the tests and generate a detailed code coverage report, follow these steps:

Navigate to the backend directory:

```
cd backend
```
Execute the test command:

```
npm run test:cov
```
The coverage report will show you the percentage of your logic (Controllers, Services, and Entities) currently protected by tests.

## Optional Question
### Express your opinion about how to optimize your website in case that this website contains intensive data and when more people access, the lower speed you get?
- use ` useMemo` for showing history of reservation
- use Pagination for the table of reservation history

### Express your opinion about how to handle when many users want to reserve the ticket at the same time? We want to ensure that in the concerts there is no one that needs to stand up during the show.
- use MessageBroker such as RabbitMQ to avoid server crash from heavy traffic
