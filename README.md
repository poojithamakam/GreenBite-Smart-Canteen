# Smart Canteen — Full-stack pickup ordering system

This project contains a React/Vite frontend and Java 17+/Spring Boot backend with MySQL, JWT login, student/admin roles, menu/category APIs, order creation/history/status APIs, dashboard summary, and Razorpay test-mode order creation plus server-side signature and webhook verification.

**Pickup only:** no delivery addresses, delivery partners, delivery charges, or delivery tracking.

## Requirements
- Node.js LTS and npm
- Java 17+
- MySQL 8+
- Maven 3.9+
- Razorpay test account for testing payments

## 1. Create database
Start MySQL and run:
```sql
CREATE DATABASE smart_canteen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Hibernate creates/updates tables for local development.

## 2. Configure backend
Edit `smart-canteen-backend/src/main/resources/application.properties` or set environment variables. Required values:
- `DB_URL=jdbc:mysql://localhost:3306/smart_canteen?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true`
- `DB_USERNAME` and `DB_PASSWORD`
- `JWT_SECRET` at least 32 bytes
- `FRONTEND_ORIGIN=http://localhost:5173`
- Razorpay `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` for payment testing
- `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` to create the first admin on startup (only if the email does not already exist)

Never put Razorpay secret keys in React or commit real credentials.

## 3. Run backend
Open a terminal:
```bash
cd smart-canteen-backend
mvn spring-boot:run
```
API base: `http://localhost:8080/api`  
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## 4. Run frontend
Open a second terminal:
```bash
cd smart-canteen-frontend
npm install
```
Copy `.env.example` to `.env` and set `VITE_API_BASE_URL=http://localhost:8080/api`, then:
```bash
npm run dev
```
Open `http://localhost:5173`.

## 5. Try it
1. Open `/register` and register a student. Public registration always assigns STUDENT.
2. Log in; the API issues a JWT and the frontend stores it in localStorage for this development project.
3. To sign in as admin, use the initial admin configured by environment variables before first startup. Never create admin accounts through public registration.
4. Menu data is seeded by the backend and the API is available at `/api/food-items`.
5. Checkout calls backend order creation and Razorpay test-order endpoints; it verifies the Razorpay response server-side before clearing the cart.

## API summary
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/categories`, `GET /api/food-items`, `GET /api/food-items/{id}`
- `POST/PUT/PATCH/DELETE /api/admin/food-items...`; `POST/PUT /api/admin/categories...`
- `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders/{id}`
- `GET /api/admin/orders`, `PATCH /api/admin/orders/{id}/status`, `GET /api/admin/dashboard/summary`
- `POST /api/payments/razorpay/create-order`, `POST /api/payments/razorpay/verify`, `POST /api/payments/razorpay/webhook`

## Important implementation notes
- The backend is the authority for food prices; the client sends only food IDs and quantities when creating an order.
- Razorpay payment state changes only after signature verification and a server-side payment fetch, or a verified `payment.captured` webhook.
- The UI has an attractive sample menu and admin preview; some menu/history/admin screens still use prototype data/state and need further wiring for full end-to-end synchronization. WebSocket push, refunds, comprehensive tests, rate limiting, migration scripts, and production security hardening are not complete in this starter.
- Do not use real payment credentials or deploy for real customers before finishing the remaining integration and performing a security review.
