import { claimDetailStore } from "../zustand";

const useClaimDetail = () => {
  const {
    claimDetail,
    isLoading: isLoadingClaimDetail,
    isError: isErrorClaimDetail,
    error: errorClaimDetail,
  } = claimDetailStore((state) => ({
    claimDetail: state.claimDetail,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { create: createClaimDetail, setData: setDataClaimDetail } =
    claimDetailStore();

  return {
    claimDetail,
    isLoadingClaimDetail,
    isErrorClaimDetail,
    errorClaimDetail,
    createClaimDetail,
    setDataClaimDetail,
  };
};

export default useClaimDetail;
