import { Item } from "@/components/items";
import { AddButton, Text } from "@/components/ui";
import { Data, getDailyData, updateData } from "@/lib/data";
import { Link } from "expo-router";
import { Settings } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Page() {
  const today = new Date(2024, 1, 22);
  const [data, setData] = useState<Data[]>([]);

  useEffect(updateData(setData), []);

  const dailyData = getDailyData(
    data,
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
