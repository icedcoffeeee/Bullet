import { Text } from "@/components/ui";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function Page() {
  const year = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth());
  return (
    <View>
      <View className="flex-row justify-between items-center gap-3 mb-3">
        <Pressable onPress={() => setMonth(month - 1)}>
          <ArrowLeftSquare color={"white"} size={20} />
        </Pressable>
        <Text className="text-2xl">
          {new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Pressable onPress={() => setMonth(month + 1)}>
          <ArrowRightSquare color={"white"} size={20} />
        </Pressable>
      </View>
    </View>
  );
}
