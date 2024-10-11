import { axiosPublic, axiosPrivate } from "../axios";

const createPost = (data) => {
  return axiosPrivate.post("/posts", data);
};

const getPost = (postId) => {
  return axiosPublic.get(`/posts/i/${postId}`);
};

const getPosts = () => {
  return axiosPublic.get("/posts");
};

const getUserPosts = (username) => {
  return axiosPublic.get(`/posts/u/${username}`);
};

const deletePost = (postId) => {
  return axiosPrivate.delete(`/posts/i/${postId}`);
};

const deleteUserPosts = (username) => {
  return axiosPrivate.delete(`/posts/u/${username}`);
};

export {
  createPost,
  getPost,
  getPosts,
  getUserPosts,
  deletePost,
  deleteUserPosts,
};
