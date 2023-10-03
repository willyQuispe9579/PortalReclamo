import { create } from "zustand";
import apiInstance from "@/util/api";
import IClaimType from "@/interfaces/claimType";

type claimTypeState = {
  claimTypeList: IClaimType[];
  claimType: IClaimType;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
  create: (typename: string) => void;
  update: (id: string, typename: string) => void;
  remove: (id: string) => void;
};
const initData = {
  id: "",
  typename: "",
};

export const claimTypeStore = create<claimTypeState>((set, get) => ({
  claimTypeList: [],
  claimType: initData,
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

      const { data } = await apiInstance.post("/typeClaim/getAll");

      set((state) => ({
        ...state,
        claimTypeList: data.data ? data.data : [],
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
  create: async (typename: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/typeClaim/create", {
        typename,
      });

      set((state) => ({
        ...state,
        claimType: data.data ? data.data : initData,
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
  update: async (id: string, typename: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/typeClaim/update", {
        id,
        typename,
      });

      set((state) => ({
        ...state,
        claimType: data.data ? data.data : initData,
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
  remove: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/typeClaim/remove", { id });

      set((state) => ({
        ...state,
        claimType: data.data ? data.data : initData,
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
