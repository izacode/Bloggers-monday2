import { posts, PostType, bloggers, BloggerType } from "./db";

export type ErrorType = {
  data: {
    id?: number;
    name?: string;
    youtubeURI?: string;
    title?: string;
    shortDescription?: string;
    content?: string;
    bloggerID?: number;
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

export const postsHandlers = {
  getAllPosts() {
    const postsWithBloggerNames: PostType[] = posts.map((p: PostType) =>
      Object.assign(p, { bloggerName: bloggers.find((b: BloggerType) => b.id === p.bloggerId)?.name })
    );
    return postsWithBloggerNames;
  },

  createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
    const blogger = bloggers.find((b: BloggerType) => b.id === bloggerId);
    if (blogger) {
      const newPost: PostType = {
        id: Number(posts.length + 1),
        title,
        shortDescription,
        content: "Lorem ipsum dolor ",
        bloggerId,
      };

      posts.push(newPost);
      const postsWithBloggerNames: PostType[] = posts.map((p: PostType) =>
        Object.assign(p, { bloggerName: bloggers.find((b: BloggerType) => b.id === p.bloggerId)?.name })
      );
      return postsWithBloggerNames.find((p: PostType) => p.id === newPost.id);
    } else {
      return false;
    }
  },

  getPost(postID: number) {
    const post = posts.find((p) => p.id === postID);
    return post;
  },

  updatePost(postID: number, title: string, shortDescription: string, content: string, bloggerId: number) {
    const blogger = bloggers.find((b: BloggerType) => b.id === bloggerId);
    if (blogger) {
      const postWithBloggerName = posts
        .map((p: PostType) => Object.assign(p, { bloggerName: bloggers.find((b: BloggerType) => b.id === p.bloggerId)?.name }))
        .find((p: PostType) => p.id === postID);

      if (postID > posts.length || isNaN(postID)) {
        return false;
      } else if (postWithBloggerName !== undefined) {
        const updatedPost: PostType = {
          id: postID,
          title,
          shortDescription,
          content,
          bloggerId,
          bloggerName: blogger.name,
        };
        const postIndex = posts.findIndex((p: PostType) => p.id === postID);
        posts.splice(postIndex, 1, updatedPost);
        return updatedPost;
      }
    } else {
      return 0;
    }
  },
  deletePost(postID: number) {
    const post = posts.find((p: PostType) => p.id === postID);
    if (!post) {
      return false;
    } else {
      const postIndex = posts.findIndex((p: PostType) => p.id === postID);
      posts.splice(postIndex, 1);
      return post;
    }
  },
};
