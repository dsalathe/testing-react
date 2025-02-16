import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../data/blogs';
import Markdown from 'markdown-to-jsx';

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const foundBlog = await getBlogById(parseInt(id));
        setBlog(foundBlog);
      } catch (error) {
        console.error('Error loading blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
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
      <Markdown>{blog.content}</Markdown>
      <p>Published: {formatDate(blog.publishedDate)}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default BlogPage;