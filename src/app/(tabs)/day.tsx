import { Item } from "@/components/items";
import { AddButton, Text } from "@/components/ui";
import { getDailyData } from "@/lib/data";
import { FlatList, View } from "react-native";

export default function Page() {
  const today = new Date(2024, 1, 22);
  const dailyData = getDailyData(
    today.getDate(),
    today.getMonth(),
    today.getFullYear()
  );

  return (
    <View>
      <Text className="text-2xl mb-3">
        {today.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
        })}
      </Text>

      <FlatList
        data={dailyData}
        renderItem={Item}
        ListFooterComponent={<AddButton />}
      />
    </View>
  );
}
