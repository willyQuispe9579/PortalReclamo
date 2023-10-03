import { create } from "zustand";
import apiInstance from "@/utils/api";
import { IClaim, initData } from "@/interfaces/claim";

type claimDataState = {
  claimData: IClaim;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByIdClaim: (claim_id: string) => void;
};

export const claimDataStore = create<claimDataState>((set, get) => ({
  claimData: initData,
  isLoading: false,
  isError: false,
  error: "",

  getByIdClaim: async (claim_id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/claim/getById", { claim_id });

      set((state) => ({
        ...state,
        claimData: data.data ? data.data : initData,
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
