import { personStore } from "../zustand";

const usePerson = () => {
  const {
    person,
    isLoading: isLoadingPerson,
    isError: isErrorPerson,
    error: errorPerson,
  } = personStore((state) => ({
    person: state.person,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    create: createPerson,
    getByRut: getByRutPerson,
    setPerson,
  } = personStore();

  return {
    person,
    isLoadingPerson,
    isErrorPerson,
    errorPerson,
    getByRutPerson,
    createPerson,
    setPerson,
  };
};

export default usePerson;
