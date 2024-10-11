import { axiosPublic } from "../axios";

const registerUser = (data) => {
  return axiosPublic.post("/auth/register", data);
};

const loginUser = (data) => {
  return axiosPublic.post("/auth/login", data);
};

export { registerUser, loginUser };
