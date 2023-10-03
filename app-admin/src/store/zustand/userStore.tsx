import { create } from "zustand";
import apiInstance from "@/util/api";
import { IUser } from "@/interfaces/user";

type userState = {
  user: IUser;
  list: IUser[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: (
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    email: string,
    phone: string
  ) => void;
  validate: (email: string, password: string) => void;
  recoveryPassword: (email: string) => void;
  remove: (person_id: string) => void;
};

const initData = {
  id: "",
  rut: "",
  name: "",
  email: "",
  phone: "",
  maternallastname: "",
  paternallastname: "",
  photo: "",
};
export const userStore = create<userState>((set, get) => ({
  user: initData,
  list: [],
  isLoading: false,
  isError: false,
  error: "",

  create: async (
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    email: string,
    phone: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/person/create", {
        rut,
        name,
        paternallastname,
        maternallastname,
        email,
        phone,
      });

      set((state) => ({
        ...state,
        user: data.data ? data.data : initData,
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

  validate: async (email: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/validate", {
        email,
        password,
      });

      set((state) => ({
        ...state,
        user: data.data ? data.data : initData,
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

  recoveryPassword: async (email: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/recoveryPassword", {
        email,
      });

      set((state) => ({
        ...state,
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
  remove: async (person_id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/remove", {
        person_id,
      });

      set((state) => ({
        ...state,
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
