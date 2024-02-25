import { RxCollection } from "rxdb";
import { create } from "zustand";
import { DocType } from "../rxdb";

export type DB = {
  DB: RxCollection<DocType> | null;
  setDB: (DB: RxCollection<DocType>) => void;
};

export const useDB = create<DB>(function (set) {
  return {
    DB: null,
    setDB(DB) {
      set(() => ({ DB }));
    },
  };
});
