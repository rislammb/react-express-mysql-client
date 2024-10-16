import { axiosPrivate, axiosPublic } from "../axios";

const registerUser = (data) => {
  return axiosPublic.post("/auth/register", data);
};

const loginUser = (data) => {
  return axiosPublic.post("/auth/login", data);
};

const getLoggedUser = () => {
  return axiosPrivate.get("/auth/verify-token");
};

export { registerUser, loginUser, getLoggedUser };
