# Deployment guide

A public URL requires you to create hosting accounts and deploy the source; this ZIP does not publish itself automatically.

Suggested layout:
- React/Vite frontend: Vercel or Netlify (build `npm run build`, output `dist`)
- Spring Boot backend: a Java-capable host such as Render or Railway (build `mvn clean package`; start `java -jar target/smart-canteen-backend-1.0.0.jar`)
- MySQL: managed MySQL service

Steps:
1. Create a managed MySQL database and note its JDBC URL, username and password.
2. Deploy `smart-canteen-backend`; configure `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `FRONTEND_ORIGIN`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD` as service environment variables.
3. Configure Razorpay test credentials only on the backend. Add a webhook pointing to `https://YOUR_API_HOST/api/payments/razorpay/webhook` and subscribe to `payment.captured`.
4. Deploy `smart-canteen-frontend`; set `VITE_API_BASE_URL=https://YOUR_API_HOST/api` and redeploy.
5. Test student registration/login, admin authorization, order lifecycle, payment failure, payment success and webhook retries in test mode.
6. Before production, replace Hibernate `ddl-auto=update` with Flyway/Liquibase migrations, use HTTPS, strong secrets, backups, monitoring, rate limiting, safer token storage and security review.

Do not accept real payments until end-to-end UI/API integration and security review are complete.
