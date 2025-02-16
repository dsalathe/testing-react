import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../data/blogs';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const loadedBlogs = await getBlogs();
        setBlogs(loadedBlogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredBlogs = blogs.filter(blog =>
    !searchQuery || blog.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Welcome to My Blog</h1>
        <p className="subtitle">Exploring ideas, sharing knowledge</p>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="blog-grid">
        {filteredBlogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="blog-card-link"
          >
            <article className="blog-card">
              <div className="blog-card-content">
                <h2>{blog.title}</h2>
                <p className="blog-description">{blog.description}</p>
                <p className="blog-date">
                  {formatDate(blog.publishedDate)}
                </p>
                <div className="keywords-container">
                  {blog.keywords.map(keyword => (
                    <span key={keyword} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="no-results">
          <p>No blog posts found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;