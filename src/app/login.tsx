import { Text } from "@/components/ui";
import { supabase } from "@/lib/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthError } from "@supabase/supabase-js";
import { router } from "expo-router";
import { Eye } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

      <LoginButton email={email} password={password} />
      <LoginButton email={email} password={password} signUp />

      <TouchableOpacity onPress={() => router.push("/day")}>
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
  password,
  signUp,
  className,
  ...props
}: {
  email: string;
  password: string;
  signUp?: boolean;
} & PressableProps) {
  const [loading, setLoading] = useState(false);

  let label = "Log In";
  let authFunc = signInWithEmail;

  if (signUp) {
    label = "Sign Up";
    authFunc = signUpWithEmail;
  }

  return (
    <Pressable
      onPress={async () => {
        if (loading) return; // ignore
        setLoading(true);
        try {
          await authFunc(email, password);
          await AsyncStorage.setItem("user", email);
          router.push("/day");
        } catch (e) {
          if (e instanceof AuthError) Alert.alert("Auth Error", e.message);
          else if (e instanceof Error) Alert.alert("Error", e.message);
          else Alert.alert("Error", e);
        }
        setLoading(false);
      }}
      className={twMerge(
        "bg-neutral-500 p-3 max-w-min rounded items-center",
        signUp && "bg-blue-800",
        className,
      )}
      style={{ opacity: loading ? 0.5 : 1 }}
      {...props}
    >
      <Text>
        {loading ? <ActivityIndicator size={19} color={"white"} /> : label}
      </Text>
    </Pressable>
  );
}

async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;
}

async function signUpWithEmail(email: string, password: string) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw error;
  if (!session) throw Error("Please check your inbox for email verification!");
}
