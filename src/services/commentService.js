import { axiosPublic, axiosPrivate } from "../axios";

const createComment = (data) => {
  return axiosPrivate.post("/comments", data);
};

const getComment = (commentId) => {
  return axiosPublic.get(`/comments/i/${commentId}`);
};

const getComments = () => {
  return axiosPublic.get("/comments");
};

const getUserComments = (username) => {
  return axiosPublic.get(`/comments/u/${username}`);
};

const deleteComment = (commentId) => {
  return axiosPrivate.delete(`/comments/i/${commentId}`);
};

const deleteUserComments = (username) => {
  return axiosPrivate.delete(`/comments/u/${username}`);
};

export {
  createComment,
  getComment,
  getComments,
  getUserComments,
  deleteComment,
  deleteUserComments,
};
