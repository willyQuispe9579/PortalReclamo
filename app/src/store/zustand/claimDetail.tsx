import { create } from "zustand";
import apiInstance from "@/utils/api";
import IClaimDetail from "@/interfaces/claimDetail";

type claimDetailState = {
  claimDetail: IClaimDetail;
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: (
    claim_id: string,
    claim_body: string,
    type_id: string,
    person_id: string
  ) => void;
  setData: (claim_id: string, claim_body: string, type_id: string) => void;
};

const initData = {
  id: "",
  claim_id: "",
  claim_body: "",
  type_id: "",
};
export const claimDetailStore = create<claimDetailState>((set, get) => ({
  claimDetail: initData,
  isLoading: false,
  isError: false,
  error: "",

  create: async (
    claim_id: string,
    claim_body: string,
    type_id: string,
    person_id: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/claimDetail/create", {
        claim_id,
        claim_body,
        type_id,
        person_id,
      });

      set((state) => ({
        ...state,
        claimDetail: data.data ? data.data : [],
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
  setData: async (claim_id: string, claim_body: string, type_id: string) => {
    try {
      const data = {
        id: "",
        claim_id: claim_id,
        claim_body: claim_body,
        type_id: type_id,
      };
      set((state) => ({
        ...state,
        claimDetail: data,
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
