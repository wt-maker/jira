import { User } from "types/user";
import { http } from "utils/http";

export const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return http("login", { method: "POST", data }).then(handleUserResponse);
};

export const register = (data: { username: string; password: string }) => {
  return http("register", { method: "POST", data }).then(handleUserResponse);
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
