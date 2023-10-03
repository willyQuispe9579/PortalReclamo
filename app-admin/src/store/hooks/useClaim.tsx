import { claimStore } from "../zustand";

const useClaim = () => {
  const {
    claimList,
    claimData,
    isLoading: isLoadingClaim,
    isError: isErrorClaim,
    error: errorClaim,
  } = claimStore((state) => ({
    claimList: state.claimList,
    claimData: state.claimData,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getAll: getAllClaim, getById: getByIdClaim } = claimStore();

  return {
    claimList,
    claimData,
    isLoadingClaim,
    isErrorClaim,
    errorClaim,
    getAllClaim,
    getByIdClaim,
  };
};

export default useClaim;
