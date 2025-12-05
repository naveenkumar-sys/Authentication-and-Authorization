# Authentication and Authorization

A Node.js backend application that provides user authentication and authorization functionalities with JWT tokens and role-based access control.

## 📋 Project Overview

This project implements a secure user authentication and authorization system using:
- **Express.js** - Web framework
- **JWT (JSON Web Tokens)** - Secure token-based authentication
- **Bcrypt** - Password hashing and comparison
- **MongoDB** - Database for user data storage
- **Middleware** - Custom authentication and admin authorization layers

## 🚀 Features

- **User Registration** - Create new user accounts with hashed passwords
- **User Login** - Authenticate users and generate JWT tokens
- **JWT Authentication** - Verify and validate user tokens
- **Role-Based Access Control** - Admin middleware for admin-only operations
- **Password Security** - Bcrypt hashing with salt rounds for secure password storage
- **CORS Support** - Cross-Origin Resource Sharing enabled
- **Environment Configuration** - Secure environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Authentication\ and\ Authorization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auth-db
   SECRET_KEY=your_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm start          # Production mode
   npm run dev        # Development mode with nodemon
   ```

The server will start on the configured PORT (default: 5000).

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api/authentication
```

### 1. Register User
**Endpoint:** `POST /registerUser`

**Description:** Create a new user account

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "message": "The user is register successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "password": "hashed_password"
  }
}
```

**Response (Error - 503):**
```json
{
  "message": "Cannot register the user, error in registering the user"
}
```

---

### 2. Login User
**Endpoint:** `POST /loginUser`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "message": "The user logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 403):**
```json
{
  "message": "Cannot find the user"
}
```
or
```json
{
  "message": "Invalid password"
}
```

---

### 3. Get All Users
**Endpoint:** `GET /getAll`

**Description:** Retrieve all users (Admin only - requires authentication and admin role)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "message": "Admin User",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "email": "john@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  ]
}
```

## 🏗️ Project Structure

```
Authentication and Authorization/
├── Controllers/
│   └── UserControllers.js       # Business logic for user operations
├── Database/
│   └── db.config.js             # MongoDB connection configuration
├── Middlewares/
│   ├── AuthMiddleware.js        # JWT token verification
│   └── AdminMiddleware.js       # Admin role authorization
├── Model/
│   └── userSchema.js            # User schema definition
├── Routers/
│   └── userRouter.js            # Route definitions
├── server.js                    # Main application entry point
├── package.json                 # Dependencies and scripts
└── Readme.md                    # Project documentation
```

## 🔧 Key Components

### Controllers (`UserControllers.js`)
- `registerUser` - Handle user registration with password hashing
- `loginUser` - Authenticate user and generate JWT token
- `getAllUser` - Retrieve all users (admin only)

### Middlewares
- `AuthMiddleware.js` - Verify JWT token and authenticate user
- `AdminMiddleware.js` - Check if user has admin privileges

### Database Configuration
- `db.config.js` - MongoDB connection setup using Mongoose

### User Schema
- `userSchema.js` - Define user document structure with fields: username, email, password, token

## 🔐 Security Features

- **Password Hashing** - Bcrypt with 10 salt rounds
- **JWT Tokens** - Secure token-based authentication
- **Admin Middleware** - Role-based access control
- **CORS** - Cross-origin request handling
- **Environment Variables** - Sensitive data protection

## 📝 Usage Examples

### Register a New User
```bash
curl -X POST http://localhost:5000/api/authentication/registerUser \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/authentication/loginUser \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### Get All Users (with token)
```bash
curl -X GET http://localhost:5000/api/authentication/getAll \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🛠️ Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with auto-reload (nodemon)

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.0.0 | MongoDB object modeling |
| jsonwebtoken | ^9.0.2 | JWT token creation and verification |
| bcrypt | ^6.0.0 | Password hashing |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^17.2.3 | Environment variable management |
| nodemon | ^3.1.11 | Auto-restart during development |

## ⚙️ Configuration

### Environment Variables (.env)
```
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/auth   # MongoDB connection string
SECRET_KEY=your_secret_jwt_key              # Secret key for JWT signing
```

## 🤝 Contributing

This project is part of the Guvi Learning path. Feel free to enhance it with additional features such as:
- Email verification
- Password reset functionality
- Rate limiting
- User profile management
- Refresh tokens

## 👤 Author

**Naveen** - Initial Project Setup

## 📄 License

ISC

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Verify MONGODB_URI in .env file
- Check network connectivity

### JWT Token Errors
- Verify SECRET_KEY is set in .env
- Ensure token is passed in Authorization header
- Check token expiration

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the current port

## 📞 Support

For issues or questions, please review the project structure and ensure all environment variables are correctly configured.

---

**Last Updated:** December 2025
**Documentation Link:** https://documenter.getpostman.com/view/50350220/2sB3dPSAao .
