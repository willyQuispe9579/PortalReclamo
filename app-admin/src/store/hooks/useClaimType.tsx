import { claimTypeStore } from "../zustand";

const useClaimType = () => {
  const {
    claimTypeList,
    isLoading: isLoadingClaimType,
    isError: isErrorClaimType,
    error: errorClaimType,
  } = claimTypeStore((state) => ({
    claimTypeList: state.claimTypeList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getAll: getAllClaimType,
    create: createClaimType,
    update: updateClaimType,
    remove: removeClaimType,
  } = claimTypeStore();

  return {
    claimTypeList,
    isLoadingClaimType,
    isErrorClaimType,
    errorClaimType,
    getAllClaimType,
    createClaimType,
    updateClaimType,
    removeClaimType,
  };
};

export default useClaimType;
