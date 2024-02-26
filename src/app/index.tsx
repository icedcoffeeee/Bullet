import { setupDB } from "@/lib/rxdb";
import { useDB } from "@/lib/stores/dbStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Page() {
  const { setDB } = useDB(({ setDB }) => ({ setDB }));
  useEffect(() => {
    (async function () {
      let user: string;
      try {
        user = await AsyncStorage.getItem("user");
      } catch (error) {
        console.log("Could not read login", error.message);
      }
      if (!!user) {
        try {
          setDB(await setupDB());
        } catch (error) {
          console.log(error.message);
        }
        return router.push("/day");
      }
      return router.push("/login");
    })();
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={20} color={"white"} />
    </View>
  );
}
