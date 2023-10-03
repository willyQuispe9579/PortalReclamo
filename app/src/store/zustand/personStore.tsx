import { create } from "zustand";
import apiInstance from "@/utils/api";
import IPerson from "@/interfaces/person";

type personState = {
  person: IPerson;
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
  getByRut: (rut: string) => void;
  setPerson: (
    id: string,
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    email: string,
    phone: string
  ) => void;
};

const initDataPerson = {
  id: "",
  rut: "",
  name: "",
  paternallastname: "",
  maternallastname: "",
  email: "",
  phone: "",
};

export const personStore = create<personState>((set, get) => ({
  person: initDataPerson,
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
        person: data.data ? data.data : initDataPerson,
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

  getByRut: async (rut: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/person/getByRut", {
        rut,
      });

      set((state) => ({
        ...state,
        person: data.data ? data.data : initDataPerson,
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

  setPerson: async (
    id: string,
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    email: string,
    phone: string
  ) => {
    try {
      const data = {
        id,
        rut,
        name,
        paternallastname,
        maternallastname,
        email,
        phone,
      };

      set((state) => ({
        ...state,
        person: data.id ? data : initDataPerson,
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
