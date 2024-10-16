import { axiosPublic, axiosPrivate } from "../axios";

const getAllLikes = () => {
  return axiosPublic.get(`/likes`);
};
const getLikesByPost = (postId) => {
  return axiosPublic.get(`/likes/p/${postId}`);
};
const toggleLike = (postId) => {
  return axiosPrivate.get(`/likes/${postId}`);
};

export { getAllLikes, getLikesByPost, toggleLike };
