import AsyncStorage from "@react-native-async-storage/async-storage";
import { RxCollection, RxJsonSchema, createRxDatabase } from "rxdb";
import { getRxStorageLoki } from "rxdb/plugins/storage-lokijs";

export interface DocType {
  id: number;
  type: string;
  content: string;
  dateString: string;
  plan: boolean;
  childrenIds?: number[];
}

export async function getDB() {
  const rxdb = await createRxDatabase({
    name: "user",
    storage: getRxStorageLoki(),
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
      plan: { type: "boolean", default: false },
      childrenIds: {
        type: "array",
        uniqueItems: true,
        items: { type: "integer" },
      },
    },
    required: ["id", "type", "content", "dateString", "plan"],
    indexes: ["dateString"],
  };

  const rxcollections: { user: RxCollection<DocType> } =
    await rxdb.addCollections({
      user: { schema },
    });

  const userDB = rxcollections.user;

  if (!!(await AsyncStorage.getItem("user"))) {
    // supabase replication
  }

  return userDB;
}
