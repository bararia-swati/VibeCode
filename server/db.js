const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'notes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database at', dbPath);
    
    // Create notes table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Notes table ready');
      }
    });
  }
});

// Promisify SQLite queries
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (sql.trim().toLowerCase().startsWith('select')) {
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Query error:', err.message);
          reject(err);
        } else {
          resolve({ rows });
        }
      });
    } else {
      db.run(sql, params, function(err) {
        if (err) {
          console.error('Query error:', err.message);
          reject(err);
        } else {
          resolve({ 
            rows: this.changes > 0 ? [{ id: this.lastID }] : [] 
          });
        }
      });
    }
  });
};

module.exports = { query }; 