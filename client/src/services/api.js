import axios from 'axios';

// Use environment variable with fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // Get all notes
  getNotes: async () => {
    try {
      const response = await axios.get(`${API_URL}/notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Get a specific note
  getNote: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  },

  // Create a new note
  createNote: async (note) => {
    try {
      const response = await axios.post(`${API_URL}/notes`, note);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update a note
  updateNote: async (id, note) => {
    try {
      const response = await axios.put(`${API_URL}/notes/${id}`, note);
      return response.data;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  }
}; 