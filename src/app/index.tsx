import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Page() {
  useEffect(() => {
    (async function () {
      try {
        const user = await AsyncStorage.getItem("user");
        if (!!user) return router.push("/day");
        return router.push("/login");
      } catch (error) {
        console.log("Could not read login");
      }
    })();
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={20} color={"white"} />
    </View>
  );
}
