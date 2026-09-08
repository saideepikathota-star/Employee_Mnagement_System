# 🏛️ TechCorp HRMS — Human Resource Management System

A full-stack HR Management System built with **React + Vite** (frontend) and **Spring Boot + MySQL** (backend).

---

## ✨ Features

- 📊 **Dashboard** — Live stat cards (employees, departments, salary budget, average salary)
- 👥 **Employee Management** — Add, Edit, Delete employees with search & filter
- 🏢 **Department Management** — Full CRUD with card-based UI
- 🔍 **Real-time Search** — Filter employees by name, email, designation, or department
- ⚠️ **Confirmation Dialogs** — Safe delete with animated modal
- 🔔 **Toast Notifications** — Success/error feedback on every action
- 📱 **Responsive Layout** — Works on desktop, tablet, and mobile
- 🎨 **Modern UI** — Inter font, gradient accents, skeleton loading, dark sidebar

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Axios, React Router v7 |
| Backend | Java 17, Spring Boot, Spring Data JPA, Hibernate |
| Database | MySQL |
| Styling | Vanilla CSS with CSS Custom Properties |

---

## 📁 Project Structure

```
Employee-Management-System/
│
├── frontend/                  ← React + Vite app
│   ├── src/
│   │   ├── components/        ← Sidebar, Navbar, ConfirmDialog, Toast, EmployeeTable
│   │   ├── pages/             ← Dashboard, Employees, AddEmployee, EditEmployee, Departments
│   │   ├── Services/          ← EmployeeService.js, DepartmentService.js
│   │   └── styles/            ← CSS design system
│   ├── index.html
│   └── package.json
│
└── backend/                   ← Spring Boot app
    └── src/main/java/com/ems/
        ├── controller/        ← EmployeeController, DepartmentController
        ├── entity/            ← Employee, Department
        ├── repository/        ← EmployeeRepository, DepartmentRepository
        └── service/           ← EmployeeService, DepartmentService
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### 1. Setup Database

Create the MySQL database:
```sql
CREATE DATABASE employee_db;
```

### 2. Configure Backend

Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### 3. Run Backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend runs at → `http://localhost:8080`

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → `http://localhost:5173`

---

## 🔌 REST API Endpoints

### Employees — `/employees`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Get all employees |
| GET | `/employees/{id}` | Get by ID |
| POST | `/employees` | Create employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |
| GET | `/employees/stats` | Dashboard statistics |

### Departments — `/departments`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/departments` | Get all departments |
| GET | `/departments/{id}` | Get by ID |
| POST | `/departments` | Create department |
| PUT | `/departments/{id}` | Update department |
| DELETE | `/departments/{id}` | Delete department |
| GET | `/departments/count` | Total count |

---

## 👤 Author

**Baladithya** — [GitHub](https://github.com/Baladithya23)

---

## 📄 License

This project is for educational purposes.
