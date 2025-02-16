import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      const foundBlog = blogs.find(b => b.id === parseInt(id));
      setBlog(foundBlog || null);
      setLoading(false);
    };
    
    loadBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Blog post not found</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Published: {blog.publishedDate}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default BlogPage;