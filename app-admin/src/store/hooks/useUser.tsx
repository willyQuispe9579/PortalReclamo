import { userStore } from "../zustand";

const useUser = () => {
  const {
    user,
    list: userList,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userStore((state) => ({
    user: state.user,
    list: state.list,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    validate: validateUser,
    recoveryPassword,
    create: createUser,
    remove: removeUser,
  } = userStore();

  return {
    user,
    userList,
    isLoadingUser,
    isErrorUser,
    errorUser,
    validateUser,
    recoveryPassword,
    createUser,
    removeUser,
  };
};

export default useUser;
