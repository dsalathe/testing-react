import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router basename="/testing-react">
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