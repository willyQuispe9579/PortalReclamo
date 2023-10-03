import { create } from "zustand";
import apiInstance from "@/utils/api";

type claimState = {
  claim: any;
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: () => void;
  setDataClaim: (body_claim: string, type_id: string) => void;
};

const initDataClaim = {
  id: "",
  openingdate: "",
  endingdate: "",
};

export const claimStore = create<claimState>((set, get) => ({
  claim: initDataClaim,
  type_id: "",
  body_claim: "",
  isLoading: false,
  isError: false,
  error: "",

  create: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/claim/create");

      set((state) => ({
        ...state,
        claim: data.data ? data.data : initDataClaim,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e: any) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  setDataClaim: async (body_claim: string, type_id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      set((state) => ({
        ...state,
        type_id: type_id,
        body_claim: body_claim,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e: any) {
      console.log(e);
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: e.response.data.error,
      }));
    }
  },
}));
