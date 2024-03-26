import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workOutDisatch } = useWorkoutsContext();
  const logout = () => {
    // clear from localstorage

    localStorage.removeItem("user");

    // auth context

    dispatch({ type: "LOGOUT" });
    workOutDisatch({ type: "SET_WORKOUT", payload: null });
  };

  return { logout };
};
