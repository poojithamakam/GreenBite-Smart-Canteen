# GreenBite React frontend

1. Install Node.js LTS.
2. In this directory run `npm install`.
3. Copy `.env.example` to `.env`; set `VITE_API_BASE_URL=http://localhost:8080/api`.
4. Run `npm run dev` and open the URL printed by Vite (usually `http://localhost:5173`).

Login/register use the Spring Boot API. Menu reads the backend API with sample-menu fallback. Checkout creates a server-priced order and uses Razorpay Checkout; the backend must be running and Razorpay test keys configured. The cart is browser-local. The Home featured cards and some other UI content are sample data. Do not use for real payments before completing and testing the entire workflow.
