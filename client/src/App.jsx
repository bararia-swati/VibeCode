import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotesList />} />
          <Route path="/notes/new" element={<NoteForm />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/:id/edit" element={<NoteForm isEditing={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
