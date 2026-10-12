# API overview
Base URL `http://localhost:8080/api`. For protected APIs send `Authorization: Bearer <JWT>`.

Public: `POST /auth/register`, `POST /auth/login`, `GET /categories`, `GET /food-items`, `GET /food-items?categoryId=1`, `GET /food-items?search=dosa`.
Student: `GET /auth/me`, `POST /orders` with `{ "items":[{"foodItemId":1,"quantity":2}] }`, `GET /orders/my`, `GET /orders/{id}`, `POST /payments/razorpay/create-order` with `{ "orderId":1 }`, `POST /payments/razorpay/verify`, `POST /payments/razorpay/webhook`.
Admin: `POST /admin/food-items`, `PUT /admin/food-items/{id}`, `PATCH /admin/food-items/{id}/availability`, `DELETE /admin/food-items/{id}`, `POST/PUT /admin/categories`, `GET /admin/orders`, `PATCH /admin/orders/{id}/status`, `GET /admin/dashboard/summary`.
Order statuses: `ORDER_PLACED`, `PAYMENT_CONFIRMED`, `PREPARING`, `READY_FOR_PICKUP`, `COMPLETED`, `CANCELLED`. Payment statuses: `CREATED`, `PENDING`, `PAID`, `FAILED`, `REFUNDED`.
