# test_kuasar

Skill Test Backend Developer Internship - Kuasar

This project is a backend API built with Node.js and GraphQL. It leverages the following technologies:

- **GraphQL:** A query language for APIs allowing clients to request specific data from the server.
- **Apollo Server**: A powerful GraphQL server implementation for Node.js, simplifying development and integration.
- **PostgreSQL**: A robust and scalable object-relational database management system (ORDBMS).
- **Sequelize**: An ORM (Object-Relational Mapper) that streamlines the interaction between Node.js applications and relational databases like PostgreSQL.
- **bcryptjs**: A library for password hashing and salting, ensuring secure storage of user passwords in the database.
- **jsonwebtoken (JWT)**: A mechanism for creating and verifying JSON Web Tokens, enabling authentication and authorization in your API.
  nodemon: A utility that automatically restarts your Node.js application whenever you make code changes, streamlining development.

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended): https://nodejs.org/en
- npm (Node Package Manager): Typically comes bundled with Node.js
- PostgreSQL (consider using a local instance)

### 1. Clone the Repository

```bash
git clone https://github.com/fauzandwip/test_kuasar.git
```

### 2. Install Dependencies

```bash
cd test_kuasar
npm install
```

This will install all the required dependencies, including bcryptjs, jsonwebtoken, and nodemon.

### 3. Configure Environment Variables

1. Create a file named .env in the project's root directory.
2. Copy all environment variables from .env.example into .env file that you created.

All environment variables are like this.

```
PORT=

# jsonwebtoken secret key
JWT_SECRET_KEY=

# postgres database
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_NAME=
```

### 4. Create the database if not created:

```bash
npx sequelize-cli db:create
```

### 4. Run the database migrations:

```bash
npx sequelize-cli db:migrate
```

### Start the Development Server (with nodemon)

```bash
npm run dev
```

The default port for Apollo Server is typically http://localhost:4000/graphql.
