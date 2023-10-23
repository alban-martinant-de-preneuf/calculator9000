# Calculator9000

## Description
Calculator9000 is a simple calculator application built using React and PHP. It allows users to perform basic calculations and provides the option for logged-in users to save their calculations. User authentication is implemented using JWT (JSON Web Tokens) with firebase/php-jwt. The project is visible at [alban-martinant-de-preneuf.students-laplateforme.io/calculator9000/](https://alban-martinant-de-preneuf.students-laplateforme.io/calculator9000/).

## Features

- Perform basic arithmetic operations (addition, subtraction, multiplication, division).
- User authentication using JWT.
- Save and retrieve calculations for logged-in users.

## Technologies Used

- React
- PHP
- JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js and Yarn installed on your system.
- PHP installed on your server.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alban-martinant-de-preneuf/calculator9000.git
```

2. Create a file `.env` into the `backend/` folder and configure it with your sensitive information:
```env
JWT_KEY=YOUR_JWT_KEY

USER=YOUR_MARIADB_USER
PASSWORD=YOUR_MARIADB_PASSWORD
HOST=YOUR_MARIADB_HOST
CHARSET=utf8mb4
DBNAME=YOUR_MARIADB_DATABASE
TYPE=mysql
```

3. Execute the provided SQL script 'calculator9000.sql' located in the 'backend' directory to create the necessary tables.

4. Set up the PHP server with your preferred method (e.g., Apache, Nginx, etc.).

5. Install the required packages using Yarn:
```bash
cd Calculator9000/
yarn install
```

6. Start the React development server:
```bash
yarn dev
```

7. Open your browser and navigate to `http://localhost:5173/`.
