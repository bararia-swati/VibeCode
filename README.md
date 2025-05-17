# Notes App

A full-stack notes application with a React frontend and Express backend.

## Features

- Create, read, update, and delete notes
- Store notes in a PostgreSQL database
- Responsive UI for mobile and desktop

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)
- PostgreSQL (v10 or newer)

## Database Setup

1. Create a PostgreSQL database named `notesapp`:

```sql
CREATE DATABASE notesapp;
```

2. Run the SQL script to create tables:

```sql
psql -d notesapp -f server/database.sql
```

Or manually create the table by connecting to the database and running:

```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

This project is organized into two main directories:

- `server/` - Backend Express.js API with SQLite database
- `client/` - Frontend React application

## Backend (server/)

The backend is a RESTful API built with Express.js that uses SQLite for data storage.

### Key Files:
- `index.js` - Main server entry point
- `db.js` - Database connection and query interface
- `config.js` - Server configuration
- `database.sql` - SQL schema definition

### API Endpoints:
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Frontend (client/)

The frontend is a React application built with Vite.

### Key Files:
- `src/` - React components and application code
- `index.html` - HTML entry point
- `vite.config.js` - Vite configuration

## Getting Started

### Running the Backend:
```
cd server
npm install
npm start
```

### Running the Frontend:
```
cd client
npm install
npm run dev
```

## Configuration

Update the database configuration in `server/config.js` if needed:

```javascript
module.exports = {
  PORT: process.env.PORT || 5000,
  db: {
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || 'notesapp'
  }
};
```

## Accessing the Application

3. Access the application at http://localhost:5173

## Project Structure

```
note-taking-app/
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # React source files
│       ├── components/   # React components
│       └── services/     # API services
└── server/               # Express backend
    ├── database.sql      # Database schema
    ├── db.js             # Database connection
    ├── config.js         # Server configuration
    └── index.js          # Server entry point
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note 