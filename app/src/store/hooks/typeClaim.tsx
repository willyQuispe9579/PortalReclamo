import { typeClaimStore } from "../zustand";

const useTypeClaim = () => {
  const {
    list: listTypeClaim,
    isLoading: isLoadingTypeClaim,
    isError: isErrorTypeClaim,
    error: errorTypeClaim,
  } = typeClaimStore((state) => ({
    list: state.list,

    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getAll: getAllTypeClaim } = typeClaimStore();

  return {
    listTypeClaim,
    isLoadingTypeClaim,
    isErrorTypeClaim,
    errorTypeClaim,
    getAllTypeClaim,
  };
};

export default useTypeClaim;
