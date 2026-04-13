import { create } from "zustand";
import { Supplier, SupplierFormData } from "@/lib/types";
import * as api from "@/lib/suppliers";

interface SupplierStore {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  add: (data: SupplierFormData) => Promise<void>;
  update: (id: string, data: SupplierFormData) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useSupplierStore = create<SupplierStore>((set, get) => ({
  suppliers: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const suppliers = await api.getSuppliers();
      set({ suppliers, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  add: async (data) => {
    await api.addSupplier(data);
    await get().fetch();
  },

  update: async (id, data) => {
    await api.updateSupplier(id, data);
    await get().fetch();
  },

  remove: async (id) => {
    await api.deleteSupplier(id);
    await get().fetch();
  },
}));
