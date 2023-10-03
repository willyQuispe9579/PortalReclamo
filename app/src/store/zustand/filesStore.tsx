import { create } from "zustand";
import apiInstance from "@/utils/api";
import IFile from "@/interfaces/file";

type fileState = {
  fileList: IFile[];
  fileListLocal: any[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  add: (file: any) => void;
  setFile: (file: any) => void;
  remove: (public_is: string, claim_id: string) => void;
};

const initDataClaim = {
  id: "",
  typeclaim: "",
};

export const fileStore = create<fileState>((set, get) => ({
  fileList: [],
  fileListLocal: [],
  isLoading: false,
  isError: false,
  error: "",

  add: async (file: any) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/file/add", file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        ...state,
        fileList: data.data,
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

  remove: async (public_id: string, claim_id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/file/remove", {
        public_id,
        claim_id,
      });

      set((state) => ({
        ...state,
        fileList: data.data,
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
  setFile: async (files: any) => {
    try {
      set((state) => ({
        ...state,
        fileList: files,
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
