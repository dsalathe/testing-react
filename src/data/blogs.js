export const blogs = [
    {
      id: 1,
      title: "First Blog Post",
      description: "This is my first blog post",
      content: "Hello World!",
      publishedDate: "2025-02-16",
      keywords: ["first", "blog"]
    },
    {
      id: 2,
      title: "Getting Started with React",
      description: "Learn the basics of React and its core concepts",
      content: "React is a JavaScript library for building user interfaces...",
      publishedDate: "2025-02-16",
      keywords: ["react", "javascript", "tutorial"]
    }
  ];
  
  export const getBlogs = () => {
    return Promise.resolve(blogs);
  };