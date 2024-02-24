import { Text } from "@/components/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { icons } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, PressableProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Page() {
  return (
    <View className="flex-1 px-[20px]">
      <LogInOutButton />
    </View>
  );
}

function LogInOutButton() {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    (async function () {
      setLogged(!!(await AsyncStorage.getItem("user")));
    })();
  });

  return (
    <SettingButton
      label={logged ? "Log out" : "Log in"}
      icon={logged ? "LogOut" : "LogIn"}
      onPress={async () => {
        if (logged) await AsyncStorage.removeItem("user");
        router.push("/");
      }}
    />
  );
}

function SettingButton({
  className,
  label,
  icon,
  ...props
}: PressableProps & { label: string; icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <Pressable
      {...props}
      className={twMerge(
        "bg-neutral-800 p-2 rounded flex-row items-center gap-3",
        className,
      )}
    >
      <Icon size={20} color={"white"} />
      <Text>{label}</Text>
    </Pressable>
  );
}
