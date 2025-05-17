import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await api.getNotes();
        setNotes(notesData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch notes. Please try again later.');
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (error) {
        setError('Failed to delete note. Please try again later.');
      }
    }
  };

  if (loading) return <div className="loading">Loading notes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h2>My Notes</h2>
        <Link to="/notes/new" className="btn-create">
          Create New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="no-notes">No notes yet. Create your first note!</p>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p className="note-excerpt">
                {note.content.length > 100
                  ? `${note.content.substring(0, 100)}...`
                  : note.content}
              </p>
              <div className="note-footer">
                <span className="note-date">
                  {new Date(note.updated_at).toLocaleDateString()}
                </span>
                <div className="note-actions">
                  <Link to={`/notes/${note.id}`} className="btn-view">
                    View
                  </Link>
                  <Link to={`/notes/${note.id}/edit`} className="btn-edit">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList; 