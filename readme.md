# AttendHub

WebApp to manage employee attendance across departments easily. Track hours, absences, and schedules in one place.

## Run app locally

You can run this app locally on your computer by following these instructions:

1. Using your terminal or command prompt, clone the repo onto your machine in a user folder

   ```bash
   git clone https://github.com/Zurisaday01/attendHub.git
   ```

2. Change into the directory

   ```bash
   cd attendhub
   ```

3. Build the services locally on your computer by running

   ```bash
   docker compose build
   ```

4. Once this completes, you can use the following to run the services:

   ```bash
   docker compose up -d
   ```

5. After confirming that the services are running, you need to manually populate the database with the backup data:

   - **Create the role**

   ```bash
   docker compose exec postgres psql -U postgres -d postgres -c "CREATE ROLE zuryespadas WITH LOGIN SUPERUSER;"
   ```

   - **Check if the databases are there**

   ```bash
   docker compose exec postgres psql -U postgres -c "\l"
   ```

   - **Create databases**

   ```bash
   docker compose exec postgres psql -U postgres -c "CREATE DATABASE \"IdentityDb\";"
   docker compose exec postgres psql -U postgres -c "CREATE DATABASE \"EmployeeDb\";"
   docker compose exec postgres psql -U postgres -c "CREATE DATABASE \"AttendanceDb\";"
   ```

   - **Copy the Backup File Into the Container**

   `<container name where postgres is running>:/backup.sql`

   ```bash
   docker cp backups/identity_backup.sql attendhub-postgres-1:/identity_backup.sql
   docker cp backups/employee_backup.sql attendhub-postgres-1:/employee_backup.sql
   docker cp backups/attendance_backup.sql attendhub-postgres-1:/attendance_backup.sql
   ```

   - **Run Backups**

   ```bash
   docker compose exec postgres psql -U postgres -d IdentityDb -f /identity_backup.sql
   docker compose exec postgres psql -U postgres -d EmployeeDb -f /employee_backup.sql
   docker compose exec postgres psql -U postgres -d AttendanceDb -f /attendance_backup.sql
   ```

6. To see the app working, you will need to provide it with an SSL certificate. (Install following [here](https://github.com/FiloSottile/mkcert)). Once you have this, you will need to install the local Certificate Authority by using:

   ```bash
   mkcert -install
   ```

7. You will then need to create the certificate and key file on your computer to replace the certificates that I used.

   ```bash
   cd devcerts
   mkcert -key-file attendhub.local.key -cert-file attendhub.local.crt app.attendhub.local api.attendhub.local id.attendhub.local
   ```

8. You will also need to create an entry in your host file so you can reach the app by its domain name.

   ```bash
   127.0.0.1 id.attendhub.local app.attendhub.local api.attendhub.local
   ```

9. You should now be able to browse to the app on [https://app.attendhub.local](https://app.attendhub.local/)

## Microservices Structure
![structure](https://github.com/user-attachments/assets/fd4998d4-2d17-4fde-9ace-b2b8654094d2)

### **Postgres (Database Service)**

- **Purpose:** It acts as the centralized database where all the application data is stored.
- **Ports:** `5432:5432`
- **Networks:** Connected to the `backend` network for communication with other services.

### **Employee Service**

- **Purpose:** Manages employee-related functionality (e.g., managing employee profiles, roles, etc.).
- **Ports:** `7002:80`
- **Depends On:** The service depends on the PostgreSQL service.
- **Networks:** Connected to the `backend` network.

### **Attendance Service**

- **Purpose:** Manages attendance-related functionality (e.g., recording employee attendance, calculating work hours, etc.).
- **Ports:** `7001:80`
- **Depends On:** Dependent on the PostgreSQL service.
- **Networks:** Connected to the `backend` network.

### **Identity Service**

- **Purpose:** Handles user authentication and identity management (e.g., logging in, token management).
- **Ports:** `5001:80`
- **Depends On:** Dependent on the PostgreSQL service.
- **Networks:** Connected to the `backend` network.

### **Gateway Service (API Gateway)**

- **Purpose:** Acts as a reverse proxy for routing requests to the appropriate services (e.g., Employee, Attendance, Identity services).
- **Ports:** `6001:80`
- **Networks:** Connected to the `backend` network.

### **Web App (Frontend)**

- **Purpose:** The user-facing frontend application that interacts with the backend services via API calls.
- **Ports:** `3000:3000`
- **Networks:** Connected to the `backend` network.

### **Test Service**

- **Purpose:** A service for running unit tests for the web app.
- **Command:** Runs the tests using `npm run test`.
- **Networks:** Connected to the `backend` network.

### **Nginx Proxy**

- **Purpose:** Acts as a reverse proxy, managing routing and SSL termination for multiple services.

### **Networks**

- **Backend Network:**
  - All services are connected to the `backend` network, enabling them to communicate with each other.
  - This network uses the `bridge` driver, which allows containers to communicate using Docker’s internal networking.

---

## Jenkins pipeline

### **CI/CD Flow**

1. Clone the repository from GitHub.
2. Build and start the microservices using `docker-compose`.
3. Install and verify **Snyk** security tool.
4. Run **Snyk container security scans** for vulnerabilities in Docker images.
5. Execute **unit tests** inside the test container.
6. Authenticate and **push Docker images** to Docker Hub.
7. Cleanup the workspace after execution.

This pipeline ensures **code security**, **automated testing**, and **continuous deployment** by building, testing, scanning, and pushing images to Docker Hub.

### **Stages of the Pipeline**

#### **Stage 1: Clone Repository**

- Clones the `main` branch of the GitHub repository.

#### **Stage 2: Build Docker Images**

- Uses `docker-compose up -d` to start all services in detached mode.
- Ensures that all microservices are running.

#### **Stage 3: Install Snyk**

- Checks if **Snyk** (a security vulnerability scanner) is installed.
- If missing, installs it globally using `npm install snyk -g`.
- Verifies the installation by running `snyk --version`.

#### **Stage 4: Snyk Security Container Test**

- Defines a list of microservice images.
- Runs **Snyk container security tests** on each Docker image with:
  - `-severity-threshold=medium` → Fails if medium/high vulnerabilities are found.
  - `-json --fail-on=upgradable` → Generates JSON reports and fails if vulnerabilities can be fixed by upgrades.
- Test results are saved in JSON files (`snyk-report-<image>.json`).

#### **Stage 5: Run Unit Tests**

- Runs unit tests using `docker-compose run --rm test`.

#### **Stage 6: Push Docker Images**

- **Authenticates** to Docker Hub using credentials stored in Jenkins.
- Pushes each microservice image to **Docker Hub**.
- Uses `docker.withRegistry()` to securely manage the login session.

---

## Jenkins Pipeline Execution - Successful Build

https://github.com/user-attachments/assets/454d83f9-3e4b-4020-88f3-29f5c7b58e7f

## AttendHub - How It Works



https://github.com/user-attachments/assets/3ff87e2c-006b-4dbb-9d64-d29b29950ed1


https://github.com/user-attachments/assets/a6e8fdc8-43d0-4d6f-aec5-d1f210d92f4b




---

## Employee Service Overview

### **Employee API Endpoints**

| Method | Endpoint        | Description           | Request Body / Params            |
| ------ | --------------- | --------------------- | -------------------------------- |
| GET    | /employees      | Get all employees     | -                                |
| GET    | /employees/{id} | Get employee by ID    | `{ id }` as path param           |
| POST   | /employees      | Create a new employee | `{ name, departmentId, roleId }` |
| PUT    | /employees/{id} | Update an employee    | `{ name, departmentId, roleId }` |
| DELETE | /employees/{id} | Delete an employee    | `{ id }` as path param           |

### **Employee Model Table**

| Property        | Type         | Description                                           |
| --------------- | ------------ | ----------------------------------------------------- |
| `Id`            | `Guid`       | Unique identifier for the employee.                   |
| `FullName`      | `string`     | Full name of the employee.                            |
| `Email`         | `string`     | Employee’s email address.                             |
| `DepartmentId`  | `Guid`       | Foreign key referencing the `Department`.             |
| `Department`    | `Department` | Navigation property for related `Department`.         |
| `RoleId`        | `Guid`       | Foreign key referencing the `Role`.                   |
| `Role`          | `Role`       | Navigation property for related `Role`.               |
| `DateOfJoining` | `DateTime`   | Date when the employee joined the company.            |
| `DateOfLeaving` | `DateTime?`  | Nullable—date when the employee left (if applicable). |
| `Status`        | `Status`     | Employment status (`Confirmed`, `Pending`, `Absent`). |
| `CreatedAt`     | `DateTime`   | Timestamp of when the record was created.             |
| `UpdatedAt`     | `DateTime`   | Timestamp of the last update.                         |

### **Department API Endpoints**

| Method | Endpoint          | Description             | Request Body / Params  |
| ------ | ----------------- | ----------------------- | ---------------------- |
| GET    | /departments      | Get all departments     | -                      |
| GET    | /departments/{id} | Get department by ID    | `{ id }` as path param |
| POST   | /departments      | Create a new department | `{ name }`             |
| PUT    | /departments/{id} | Update a department     | `{ name }`             |
| DELETE | /departments/{id} | Delete a department     | `{ id }` as path param |

### **Department Model**

| Property    | Type                    | Description                                                                |
| ----------- | ----------------------- | -------------------------------------------------------------------------- |
| `Id`        | `Guid`                  | Unique identifier for the department.                                      |
| `Name`      | `string`                | Name of the department                                                     |
| `Employees` | `ICollection<Employee>` | Navigation property for related employees associated with this department. |

### **Role API Endpoints**

| Method | Endpoint    | Description       | Request Body / Params  |
| ------ | ----------- | ----------------- | ---------------------- |
| GET    | /roles      | Get all roles     | -                      |
| GET    | /roles/{id} | Get role by ID    | `{ id }` as path param |
| POST   | /roles      | Create a new role | `{ name }`             |
| PUT    | /roles/{id} | Update a role     | `{ name }`             |
| DELETE | /roles/{id} | Delete a role     | `{ id }` as path param |

### **Role Model**

| Property    | Type                    | Description                                                          |
| ----------- | ----------------------- | -------------------------------------------------------------------- |
| `Id`        | `Guid`                  | Unique identifier for the role.                                      |
| `Name`      | `string`                | Name of the role (e.g., "Manager", "Employee", etc.).                |
| `Employees` | `ICollection<Employee>` | Navigation property for related employees associated with this role. |

## **Attendance Service Overview**

| Enum Value | Integer Value | Description                                       |
| ---------- | ------------- | ------------------------------------------------- |
| `Active`   | `0`           | The employee is currently active and working.     |
| `Inactive` | `1`           | The employee is inactive, not currently working.  |
| `OnLeave`  | `2`           | The employee is on leave, not available for work. |

### **Attendance API Endpoints**

| Method | Endpoint              | Description                                       | Request Body / Params                                                |
| ------ | --------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | /api/attendances      | Get all attendances (with optional date filter)   | `startDate`, `endDate` as query params                               |
| GET    | /api/attendances/{id} | Get attendance details by ID (with employee info) | `{ id }` as path param                                               |
| POST   | /api/attendances      | Create a new attendance record                    | `{ employeeId, arriveTime, leaveTime, date, status }`                |
| PATCH  | /api/attendances/{id} | Update an existing attendance record              | Partial fields `{ employeeId, arriveTime, leaveTime, date, status }` |
| DELETE | /api/attendances/{id} | Delete an attendance record by ID                 | `{ id }` as path param                                               |

### **Attendance Model**

| Property     | Type        | Description                                                        |
| ------------ | ----------- | ------------------------------------------------------------------ |
| `Id`         | `Guid`      | Unique identifier for the attendance record.                       |
| `EmployeeId` | `Guid`      | Foreign key referencing the employee.                              |
| `ArriveTime` | `DateTime?` | The time the employee arrived (nullable).                          |
| `LeaveTime`  | `DateTime?` | The time the employee left (nullable).                             |
| `Date`       | `DateTime`  | The date of the attendance record (defaults to `DateTime.UtcNow`). |
| `Status`     | `Status`    | The status of the attendance (assumed to be an enum).              |

### **Attendance Status Enum**

| Enum Value  | Integer Value | Description                                         |
| ----------- | ------------- | --------------------------------------------------- |
| `Confirmed` | `0`           | The attendance is confirmed.                        |
| `Pending`   | `1`           | The attendance is pending approval or verification. |
| `Absent`    | `2`           | The employee was absent.                            |
