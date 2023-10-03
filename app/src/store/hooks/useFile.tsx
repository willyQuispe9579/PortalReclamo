import { fileStore } from "../zustand";

const useClaim = () => {
  const {
    fileList,
    fileListLocal,
    isLoading: isLoadingFile,
    isError: isErrorFile,
    error: errorFile,
  } = fileStore((state) => ({
    fileListLocal: state.fileListLocal,
    fileList: state.fileList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { add: addFile, setFile, remove: removeFile } = fileStore();

  return {
    fileList,
    fileListLocal,
    isLoadingFile,
    isErrorFile,
    errorFile,
    addFile,
    removeFile,
    setFile,
  };
};

export default useClaim;
