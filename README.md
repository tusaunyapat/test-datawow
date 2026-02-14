## 🚀 Installation & Setup

To get the entire environment (Frontend, Backend, and Database) up and running quickly using Docker, follow these steps:

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
## 🧪 Testing
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
