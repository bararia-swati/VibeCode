module.exports = {
  PORT: process.env.PORT || 5001,
  db: {
    user: process.env.PG_USER || 'sk',
    password: process.env.PG_PASSWORD || '',  // Empty password for now
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || 'notesapp'
  }
}; 