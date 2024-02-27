import { RxCollection, RxDatabase } from "rxdb";
import { create } from "zustand";
import { DocType } from "../rxdb";

export type DB = {
  DB: RxDatabase;
  user: RxCollection<DocType>;
  setDB: (DB: RxDatabase, user: RxCollection<DocType>) => void;
};

export const useDB = create<DB>((set) => ({
  DB: null,
  user: null,
  setDB(DB, user) {
    set({ DB, user });
  },
}));
