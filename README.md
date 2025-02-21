# E-commerce Project Documentation

## Overview
This is a full-stack e-commerce application with a Node.js backend. It provides functionalities for managing products, users, authentication, and orders.

## Tech Stack
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Authentication:** JWT
- **Payments:** Stripe

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB instance running
- Stripe account and API keys

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd ecommerce-master
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (e.g., `.env` file):
   ```sh
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## Folder Structure
```
/ecommerce-master
│-- /src
│   │-- /routes        # API route definitions
│   │-- /controllers   # Business logic & request handling
│   │-- /models        # Mongoose models
│   │-- /middleware    # Authentication & authorization
│   │-- /config        # Configuration files
│   │-- /payments      # Stripe payment integration
│   │-- server.js      # Entry point for backend
│-- package.json      # Dependencies & scripts
│-- .env.example      # Example environment variables
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token

### Products
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add a new product (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create a new order

### Payments
- `POST /api/payments/create-session` - Create a Stripe checkout session
- `POST /api/payments/webhook` - Handle Stripe webhook events

## Usage Guide
1. Register or login to get an authentication token.
2. Fetch available products using `/api/products`.
3. Add products to the cart and proceed to checkout.
4. Place an order and track it via `/api/orders`.
5. Complete payment using Stripe integration.

## Deployment
- Deploy backend using **Heroku, Vercel, or AWS**.
- Connect to a remote **MongoDB Atlas** database.
- Use **Docker** for containerization.
- Configure Stripe webhook endpoints for production.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push changes: `git push origin feature-branch`
5. Submit a pull request.

## License
MIT License. Feel free to modify and use.

