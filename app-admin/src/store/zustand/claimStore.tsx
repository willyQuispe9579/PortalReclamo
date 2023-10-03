import { create } from "zustand";
import apiInstance from "@/util/api";
import { IClaim, initData } from "@/interfaces/claim";

type claimState = {
  claimList: IClaim[];
  claimData: IClaim;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
  getById: (claim_id: string) => void;
};

export const claimStore = create<claimState>((set, get) => ({
  claimList: [],
  claimData: initData,
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

      const { data } = await apiInstance.get("/claim/getAll");

      set((state) => ({
        ...state,
        claimList: data.data ? data.data : [],
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
  getById: async (claim_id: string) => {
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
