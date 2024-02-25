import AsyncStorage from "@react-native-async-storage/async-storage";
import { RxCollection, RxJsonSchema, createRxDatabase } from "rxdb";
import { getRxStorageLoki } from "rxdb/plugins/storage-lokijs";
import { DB } from "./stores/dbStore";

export interface DocType {
  id: number;
  type: string;
  content: string;
  dateString: string;
  planned: boolean;
  childrenIds?: number[];
}

export async function setupDB(setDB: DB["setDB"]) {
  const rxdb = await createRxDatabase({
    name: "user",
    storage: getRxStorageLoki(),
    multiInstance: false,
  });

  const schema: RxJsonSchema<DocType> = {
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: { type: "integer", maxLength: 100 },
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

  const rxcollections: { user: RxCollection<DocType> } =
    await rxdb.addCollections({
      user: { schema },
    });

  const userDB = rxcollections.user;

  setDB(userDB);

  if (!!(await AsyncStorage.getItem("user"))) {
    // supabase replication
  }
}
