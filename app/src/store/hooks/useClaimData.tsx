import { claimDataStore } from "../zustand";

const useClaimData = () => {
  const {
    claimData,
    isLoading: isLoadingClaimData,
    isError: isErrorClaimData,
    error: errorClaimData,
  } = claimDataStore((state) => ({
    claimData: state.claimData,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByIdClaim } = claimDataStore();

  return {
    claimData,
    isLoadingClaimData,
    isErrorClaimData,
    errorClaimData,
    getByIdClaim,
  };
};

export default useClaimData;
