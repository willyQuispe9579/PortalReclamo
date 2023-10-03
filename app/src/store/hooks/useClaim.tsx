import { claimStore } from "../zustand";

const useClaim = () => {
  const {
    claim,
    isLoading: isLoadingClaim,
    isError: isErrorClaim,
    error: errorClaim,
  } = claimStore((state) => ({
    claim: state.claim,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { create: createClaim, setDataClaim } = claimStore();

  return {
    claim,
    isLoadingClaim,
    isErrorClaim,
    errorClaim,
    createClaim,
    setDataClaim,
  };
};

export default useClaim;
