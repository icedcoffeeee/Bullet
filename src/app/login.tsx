import { Text } from "@/components/ui";
import { getCollection, initializeRxDB } from "@/lib/rxdb";
import { useDB } from "@/lib/stores/dbStore";
import { supabase } from "@/lib/supabase";
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

type Auth = {
  email: string;
  password: string;
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const auth: Auth = { email, password };
  const { DB, setDB } = useDB();

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

      <LoginButton auth={auth} />
      <LoginButton auth={auth} signup />

      <TouchableOpacity
        onPress={async () => {
          let rxdb = DB;
          try {
            rxdb = await initializeRxDB();
          } catch {}

          try {
            const user = await getCollection("guest", rxdb);
            setDB(rxdb, user);
          } catch (e) {
            console.log(e);
          }

          router.push("/day");
        }}
      >
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
  auth,
  signup,
  ...props
}: {
  auth: Auth;
  signup?: boolean;
} & PressableProps) {
  const [loading, setLoading] = useState(false);
  const label = signup ? "Sign Up" : "Log In";
  const { DB, setDB } = useDB();

  return (
    <Pressable
      onPress={async () => {
        if (loading) return;
        setLoading(true);

        try {
          await signin(auth);
        } catch (e) {
          if (e instanceof AuthError) Alert.alert(e.name, e.message);
        }

        let rxdb = DB;
        try {
          rxdb = await initializeRxDB();
        } catch {}

        try {
          const user = await getCollection(auth.email, rxdb);
          setDB(rxdb, user);
        } catch (e) {
          console.log(e);
          router.push("/day");
        }

        try {
          await AsyncStorage.setItem("user", auth.email);
          router.push("/day");
        } catch (e) {
          console.log(e);
        }

        setLoading(false);
      }}
      className={twMerge(
        "bg-neutral-500 p-3 max-w-min rounded items-center",
        signup && "bg-blue-800",
        loading && "opacity-50"
      )}
      {...props}
    >
      <Text>
        {loading ? <ActivityIndicator size={19} color={"white"} /> : label}
      </Text>
    </Pressable>
  );
}

async function signin(auth: Auth, signup?: boolean) {
  if (!signup) {
    // Sign in with supabase
    const { error } = await supabase.auth.signInWithPassword(auth);
    if (error) throw error;
  } else {
    // Register an account
    const { data, error } = await supabase.auth.signUp(auth);
    if (error) throw error;
    if (!data.session)
      new Error("Please check your inbox for email verification!");
  }
}
