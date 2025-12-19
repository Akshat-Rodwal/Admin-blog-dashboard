import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import BlogDetail from './pages/BlogDetail';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/:id/edit" element={<BlogForm />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
