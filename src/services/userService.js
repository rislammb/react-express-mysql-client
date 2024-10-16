import { axiosPrivate } from "../axios";

const getUsers = () => {
  return axiosPrivate.get("/users");
};

const blockUser = (userId) => {
  return axiosPrivate.get(`/users/block/${userId}`);
};

const unblockUser = (userId) => {
  return axiosPrivate.get(`/users/unblock/${userId}`);
};

const deleteUser = (userId) => {
  return axiosPrivate.delete(`/users/${userId}`);
};

export { getUsers, blockUser, unblockUser, deleteUser };
