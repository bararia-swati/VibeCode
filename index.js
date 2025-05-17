const express = require('express');
const cors = require('cors');
const db = require('./db');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notes ORDER BY updated_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific note
app.get('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a note
app.post('/api/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const result = await db.query(
      'INSERT INTO notes (title, content) VALUES (?, ?)',
      [title, content]
    );
    
    // Fetch the newly created note
    const newNote = await db.query('SELECT * FROM notes WHERE id = ?', [result.rows[0].id]);
    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const currentTime = new Date().toISOString();
    const result = await db.query(
      'UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?',
      [title, content, currentTime, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Fetch the updated note
    const updatedNote = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
    
    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found after update' });
    }
    
    res.json(updatedNote.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the note before deleting to check if it exists
    const noteToDelete = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
    
    if (noteToDelete.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    await db.query('DELETE FROM notes WHERE id = ?', [id]);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
}); 