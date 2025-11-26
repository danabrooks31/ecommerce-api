# E-commerce Product Management REST API (NestJS)

A RESTful API built with NestJS for managing products, categories, and users in an e-commerce system. It supports JWT authentication, role-based access control, product search, and pagination.

## Features

### User Management
* Register and login users.
* Password hashing using bcrypt.
* Roles:
  * **Admin** – manage products & categories.
  * **Customer** – view products & categories only.
* JWT authentication for protected routes.

### Product Management
* **Admin**: Create, update, delete, and view products.
* **Customer**: View products only.
* Product attributes: `id`, `name`, `description`, `price`, `category`.

### Category Management
* **Admin**: Create, update, delete categories.
* **Customer**: View categories and products within each category.
* Supports many products per category.

### Search & Pagination
* Pagination: `GET /products?page=1&limit=10`
* Search by name/description: `GET /products?search=iphone`

### Security & Validation
* Role-based authorization.
* JWT guards.
* DTO validation with class-validator.

### Optional Features
* Swagger docs (`/api`)
* TypeORM + PostgreSQL
* Optional Redis caching for product search

## Tech Stack

* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* JWT
* bcrypt
* class-validator / class-transformer
* Swagger (`@nestjs/swagger`)

## Project Structure

```
src/
  auth/
  users/
  products/
  categories/
  common/
  app.module.ts
  main.ts
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/danabrooks31/ecommerce-api.git
cd ecommerce-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce_db

JWT_SECRET=your-secret
JWT_EXPIRES_IN=3600s
```

### 4. Set up PostgreSQL

```sql
CREATE DATABASE ecommerce_db;
```

Ensure TypeORM config is reading from `.env`.

## Running the App

```bash
npm run start:dev
```

Server runs at:

```
http://localhost:3000
```

## Swagger Documentation

Open:

```
http://localhost:3000/api
```

To test protected routes:
* Click **Authorize**
* Enter: `Bearer <your-jwt>`

## Authentication Flow

### Register
`POST /auth/register`

```json
{
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Login
`POST /auth/login`

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "..."
}
```

Use token in header:

```
Authorization: Bearer <access_token>
```

## API Endpoints

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login & get JWT |

### Products

| Method | Route | Description | Role |
|--------|-------|-------------|------|
| GET | `/products` | Get products (search/pagination) | All |
| GET | `/products/:id` | Get product by ID | All |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Categories

| Method | Route | Description | Role |
|--------|-------|-------------|------|
| GET | `/categories` | Get categories | All |
| GET | `/categories/:id` | Get category by ID | All |
| POST | `/categories` | Create category | Admin |
| PUT | `/categories/:id` | Update category | Admin |
| DELETE | `/categories/:id` | Delete category | Admin |

## Tested Functionality

* App boots & returns Hello World
* Registration (Admin + Customer)
* Login (Admin + Customer)
* JWT auth works with Bearer tokens
* Category:
  * Create
  * Get all
  * Get by ID
  * Update
  * Delete
* Product:
  * Create
  * Get all
  * Get by ID
  * Update
* Role guard:
  * Customer receives 403 Forbidden on Admin routes

Pagination has been implemented but may need final verification.

## Future Improvements

* Verify pagination logic & implement full metadata (page, limit, total).
* Add Redis caching for search results.
* Add Jest unit/e2e tests.
* Add soft delete for entities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

