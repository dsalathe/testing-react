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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to My Blog</h1>
      
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        {filteredBlogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              border: '1px solid #ddd',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px',
              backgroundColor: 'white',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
                {blog.title}
              </h2>
              <p style={{ color: '#4a5568', margin: '0 0 10px 0' }}>
                {blog.description}
              </p>
              <p style={{ color: '#718096', fontSize: '0.9em', margin: '0 0 10px 0' }}>
                Published: {formatDate(blog.publishedDate)}
              </p>
              <div style={{ marginTop: '10px' }}>
                {blog.keywords.map(keyword => (
                  <span
                    key={keyword}
                    style={{
                      backgroundColor: '#e2e8f0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      marginRight: '8px',
                      fontSize: '0.9em',
                      color: '#4a5568',
                      display: 'inline-block',
                      marginBottom: '4px'
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#718096'
        }}>
          No blog posts found matching your search.
        </div>
      )}
    </div>
  );
}

export default HomePage;