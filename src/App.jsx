import './App.css';
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';

function App() {
  const baseUrl = import.meta.env.BASE_URL || '';
  
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--mountain-bg-url', 
      `url(${baseUrl}mountainAlps.webp)`
    );
  }, [baseUrl]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;