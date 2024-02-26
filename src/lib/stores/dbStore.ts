import AsyncStorage from "@react-native-async-storage/async-storage";
import { RxCollection } from "rxdb";
import { create } from "zustand";
import { PersistStorage, createJSONStorage, persist } from "zustand/middleware";
import { DocType } from "../rxdb";

export type DB = {
  db: RxCollection<DocType> | null;
  setDB: (db: RxCollection<DocType>) => void;
};

export const useDB = create<DB>((set) => ({
  db: null,
  setDB(db) {
    set({ db });
  },
}));
