import { Item } from "@/components/items";
import { AddButton, Text } from "@/components/ui";
import { getDailyData } from "@/lib/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Settings } from "lucide-react-native";
import { Button, FlatList, View } from "react-native";

export default function Page() {
  const today = new Date(2024, 1, 22);
  const dailyData = getDailyData(
    today.getDate(),
    today.getMonth(),
    today.getFullYear(),
  );

  return (
    <View>
      <View className="mb-3 flex-row justify-between items-center">
        <Text className="text-2xl">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })}
        </Text>
        <Link href={"/settings"}>
          <Settings size={20} color={"white"} />
        </Link>
      </View>

      <FlatList
        data={dailyData}
        renderItem={Item}
        ListFooterComponent={<AddButton />}
      />
    </View>
  );
}
