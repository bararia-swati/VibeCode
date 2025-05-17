import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await api.getNote(id);
        setNote(noteData);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Note not found.');
        } else {
          setError('Failed to fetch note. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.deleteNote(id);
        navigate('/');
      } catch (error) {
        setError('Failed to delete note. Please try again later.');
      }
    }
  };

  if (loading) return <div className="loading">Loading note...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="note-detail">
      <div className="note-header">
        <h2>{note.title}</h2>
        <div className="note-actions">
          <Link to="/" className="btn-back">
            Back to Notes
          </Link>
          <Link to={`/notes/${id}/edit`} className="btn-edit">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </div>
      </div>

      <div className="note-content">
        <p>{note.content}</p>
      </div>

      <div className="note-footer">
        <p className="note-date">
          Last updated: {new Date(note.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetail; 