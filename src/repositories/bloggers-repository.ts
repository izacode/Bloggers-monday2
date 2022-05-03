import { BloggerType, bloggers } from "./db";

type ErrorType = {
  data: {
    id?: number;
    name?: string;
    youtubeUrl?: string;
    title?: string;
    shortDescription?: string;
    content?: string;
    bloggerID?: string;
    bloggerName?: string;
  };
  errorMessage: {
    message?: string;
    field?: string;
  };
  resultCode: number;
};

export let error: ErrorType = {
  data: {},
  errorMessage: {},
  resultCode: 0,
};

export const bloggersRepository = {
  getAllBloggers() {
    return bloggers;
  },
  getBlogger(id: number) {
    const blogger = bloggers.find((b: BloggerType) => b.id === id);
    if (blogger) {
      return blogger;
    } else {
      return false;
    }
  },

  createBlogger(name: string, youtubeUrl: string) {
    const newBlogger: BloggerType = {
      id: Number(bloggers.length + 1),
      name: name,
      youtubeUrl: youtubeUrl,
    };
    bloggers.push(newBlogger);
    return newBlogger;
  },

  updateBlogger(id: number, name: string, youtubeUrl: string) {
    const bloggerIndex = bloggers.findIndex((b: BloggerType) => b.id === id);
    if (bloggerIndex === -1) {
      return false;
    } else {
      const updatedBlogger: BloggerType = {
        id,
        name,
        youtubeUrl,
      };
      bloggers.splice(bloggerIndex, 1, updatedBlogger);
      return true;
    }
  },

  deleteBlogger(id: number) {
    const bloggerIndex = bloggers.findIndex((b: BloggerType) => b.id === id);
    if (bloggerIndex === -1) {
      return false;
    } else {
      bloggers.splice(bloggerIndex, 1);
      return true;
    }
  },
};
