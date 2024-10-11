import { axiosPrivate } from "../axios";

const getUsers = () => {
  return axiosPrivate.get("/users");
};

const getLoggedUser = () => {
  return axiosPrivate.get("/users/user-info");
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

export { getUsers, getLoggedUser, blockUser, unblockUser, deleteUser };
