import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LokiDatabaseSettings,
  RxCollection,
  RxDatabase,
  RxError,
  RxJsonSchema,
  createRxDatabase,
  removeRxDatabase,
} from "rxdb";
import { getLokiDatabase, getRxStorageLoki } from "rxdb/plugins/storage-lokijs";

export interface DocType {
  id?: string;
  type: string;
  content: string;
  dateString: string;
  planned: boolean;
  childrenIds?: string[];
}

const schema: RxJsonSchema<DocType> = {
  version: 0,
  primaryKey: { key: "id", fields: ["dateString"], separator: "" },
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    type: { type: "string" },
    content: { type: "string" },
    dateString: { type: "string" },
    planned: { type: "boolean", default: false },
    childrenIds: {
      type: "array",
      uniqueItems: true,
      items: { type: "integer" },
    },
  },
  required: ["id", "type", "content", "dateString", "planned"],
  indexes: ["dateString"],
};

export async function initializeRxDB(name: string) {
  let rxdb: RxDatabase;
  try {
    rxdb = await createDB(name);
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }

  return rxdb;
}
export async function getCollection(rxdb: RxDatabase) {
  const rxcollections: { user: RxCollection<DocType> } =
    await rxdb.addCollections({
      user: { schema },
    });
  console.log("collections created");
  rxdb.collection;

  const userDB = rxcollections.user;
  console.log("user collection created");

  if (!!(await AsyncStorage.getItem("user"))) {
    // supabase replication
  }

  return userDB;
}

export async function createDB(name: string) {
  const db = await createRxDatabase({
    name,
    storage: getRxStorageLoki(opts),
    multiInstance: false,
  });
  console.log("generated new db");
  return db;
}

export async function deleteDB(name: string) {
  await removeRxDatabase(name, getRxStorageLoki(opts));
  console.log("deleted prev db");
}

const opts: LokiDatabaseSettings = {
  autoload: true,
  autoloadCallback() {},
  autosave: true,
  autosaveInterval: 5 * 1000,
};
