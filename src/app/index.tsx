import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function Page() {
  useEffect(() => {
    (async function () {
      try {
        const user = await AsyncStorage.getItem("loggedIn");
        if (!!user) return router.push("/day");
        return router.push("/login");
      } catch (error) {
        console.log("Could not read login");
      }
    })();
  }, []);
  return <ActivityIndicator size={20} color={"white"} />;
}
