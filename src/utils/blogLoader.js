import matter from 'gray-matter';

const blogFiles = import.meta.glob('../data/posts/*.md', { as: 'raw' });

export const loadBlogPost = async (id) => {
  try {
    const fileName = Object.keys(blogFiles).find(
      path => path.includes(`${id.toString().padStart(3, '0')}-`)
    );

    if (!fileName) {
      return null;
    }

    const content = await blogFiles[fileName]();
    const { data, content: markdownContent } = matter(content);
    
    return {
      ...data,
      content: markdownContent
    };
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    return null;
  }
};

export const loadBlogPosts = async () => {
  try {
    const posts = [];
    const files = Object.keys(blogFiles);
    
    for (const path of files) {
      const content = await blogFiles[path]();
      const { data } = matter(content);
      posts.push({
        id: data.id,
        title: data.title,
        description: data.description,
        publishedDate: data.publishedDate,
        keywords: data.keywords
      });
    }
    
    return posts.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};