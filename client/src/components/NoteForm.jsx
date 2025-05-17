import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const NoteForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (isEditing) {
        try {
          const noteData = await api.getNote(id);
          setFormData({
            title: noteData.title,
            content: noteData.content
          });
          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('Note not found.');
          } else {
            setError('Failed to fetch note. Please try again later.');
          }
          setLoading(false);
        }
      }
    };

    fetchNote();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        await api.updateNote(id, formData);
      } else {
        await api.createNote(formData);
      }
      navigate('/');
    } catch (error) {
      setError('Failed to save note. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="note-form-container">
      <h2>{isEditing ? 'Edit Note' : 'Create New Note'}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter note title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Enter note content"
            rows="10"
          />
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-save"
          >
            {submitting ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm; 