# Expense Tracker Backend

A RESTful backend API built with Node.js, Express, MongoDB, and JWT authentication for managing expenses and incomes.

---

## Quick Start

npm install
npm run dev

---

## 🚀 Features

- User authentication (register, login, logout, refresh token)
- JWT authentication (access & refresh tokens)
- Secure password management with bcrypt
- Expense and income tracking (CRUD operations)
- Dashboard summary endpoint
- Centralized error handling
- Environment-based logging with Morgan
- Security middleware (Helmet, CORS, Cookie Parser)

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Helmet** + **CORS** for security
- **Morgan** for logging

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/expense-tracker-backend.git

# Navigate into the project
cd expense-tracker-backend

# Install dependencies
npm install
```

---

## 📚 API Routes

- **User**
- POST /api/v1/user/register – Register
- POST /api/v1/user/login – Login
- POST /api/v1/user/logout – Logout
- GET /api/v1/user/profile – Get user profile
- PATCH /api/v1/user/update-details – Update account details
- PATCH /api/v1/user/change-password – Change password
- POST /api/v1/user/refresh-token – Refresh token

**Expenses**

- POST /api/v1/expenses/add – Add expense
- GET /api/v1/expenses/list – List expenses
- DELETE /api/v1/expenses/:id – Delete expense

**Incomes**

- POST /api/v1/incomes/add – Add income
- GET /api/v1/incomes/list – List incomes
- DELETE /api/v1/incomes/:id – Delete income

**Dashboard**

- GET /api/v1/dashboard – Get summary

---

## 🔒 Authentication

- JWT authentication is applied to **all protected routes**
- **Public routes**:
  - `POST /api/v1/user/register`
  - `POST /api/v1/user/login`
- **All other routes require a valid JWT access token**
- Access token must be sent in the request header:

- Protected routes require:
  Authorization: Bearer <access_token>

---

## 🧪 Future Improvements

- Add trend charts and analytics for weekly, monthly, yearly statements
- Filter and paginate expenses/incomes by category, date, or amount
- Support recurring transactions and custom expense categories/tags
- Export reports as CSV, PDF, or Excel
- Add notifications/alerts for low balance or upcoming bills
- Implement unit & integration tests for all routes
- Add Swagger API documentation for easy testing
- Dockerize and deploy to cloud platforms (Heroku, Railway, AWS)

---

## 📄 License

- This project is licensed under the MIT License.
