import { loadBlogPosts, loadBlogPost } from '../utils/blogLoader';

export const getBlogs = async () => {
  return await loadBlogPosts();
};

export const getBlogById = async (id) => {
  return await loadBlogPost(id);
};