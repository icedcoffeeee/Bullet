import { getCollection, initializeRxDB } from "@/lib/rxdb";
import { useDB } from "@/lib/stores/dbStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Page() {
  const { DB, user, setDB } = useDB();

  useEffect(() => {
    (async () => {
      let email: string;
      try {
        email = await AsyncStorage.getItem("user");
      } catch (error) {
        console.log("Could not read login", error.message);
      }

      if (!email) return router.push("/login");
      if (!user) email = "guest";

      let rxdb = DB;
      try {
        rxdb = await initializeRxDB();
      } catch {}

      const userCollection = await getCollection(email, rxdb);
      setDB(rxdb, userCollection);
      router.push("/day");
    })();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={20} color={"white"} />
      {DB && <Redirect href="/day" />}
    </View>
  );
}
