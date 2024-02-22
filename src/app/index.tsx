import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Page() {
  let [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getLoggedInState() {
      try {
        setLoggedIn(!!(await AsyncStorage.getItem("loggedIn")));
      } catch (error) {}
    }

    getLoggedInState();
  }, []);

  return <Redirect href={loggedIn ? "/day" : "/login"} />;
}
