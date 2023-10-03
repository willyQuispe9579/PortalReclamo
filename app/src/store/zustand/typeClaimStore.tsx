import { create } from "zustand";
import apiInstance from "@/utils/api";

interface ITypeClaim {
  id: string;
  typename: string;
}
type typeClaimState = {
  list: ITypeClaim[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
};

const initDataClaim = {
  id: "",
  typeclaim: "",
};

export const typeClaimStore = create<typeClaimState>((set, get) => ({
  list: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/typeclaim/getAll");

      set((state) => ({
        ...state,
        list: data.data ? data.data : [],
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
