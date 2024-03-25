import { useAuthContext } from "./useAuthContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    // clear from localstorage

    localStorage.removeItem("user");

    // auth context

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
