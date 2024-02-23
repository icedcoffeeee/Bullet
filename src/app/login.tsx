import { Text } from "@/components/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Eye } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <View className="p-[20px] flex-1 justify-center gap-3">
      <Text className="text-3xl font-['JosefinSans\_400Regular']">Bullet</Text>

      <Text className="text-lg">Email</Text>
      <LoginInput value={email} onChangeText={setEmail} />

      <Text className="text-lg">Password</Text>
      <View className="justify-center">
        <LoginInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
        />
        <Pressable
          onPress={() => setShowPass(!showPass)}
          className="absolute right-2"
        >
          <Eye color={"black"} opacity={!showPass ? 0.5 : 1} />
        </Pressable>
      </View>

      <LoginButton email={email} />

      <TouchableOpacity>
        <Text className="self-center underline">or continue as guest</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginInput({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      className={twMerge("w-full bg-white rounded text-lg px-2", className)}
      {...props}
    />
  );
}

function LoginButton({
  email,
  className,
  ...props
}: { email: string } & PressableProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Pressable
      onPress={async () => {
        if (loading) return;
        setLoading(true);
        try {
          await AsyncStorage.setItem("loggedIn", email);
          router.push("/day");
        } catch (e) {
          console.log("Could not store login");
        }
        setLoading(false);
      }}
      className={twMerge(
        "bg-neutral-500 p-3 max-w-min rounded items-center",
        className,
      )}
      style={{ opacity: loading ? 0.5 : 1 }}
      {...props}
    >
      <Text>
        {loading ? <ActivityIndicator size={19} color={"white"} /> : "Log In"}
      </Text>
    </Pressable>
  );
}
