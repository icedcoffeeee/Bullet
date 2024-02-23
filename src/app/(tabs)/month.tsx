import { DailyItem } from "@/app/(tabs)/year";
import { Text } from "@/components/ui";
import { getMonthlyData } from "@/lib/data";
import { getNumberOfDays, getWeekdayOffset } from "@/lib/utils/dateUtils";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Page() {
  const year = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth());

  const numDays = getNumberOfDays(month, year);
  const monthlyData = getMonthlyData(month, year);
  const weekdayOffset = getWeekdayOffset(month, year);

  return (
    <View className="flex-1">
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

      <FlatList
        data={Array(numDays).fill(0)}
        renderItem={({ index }) => (
          <DailyItem
            date={index + 1}
            offset={weekdayOffset}
            monthlyData={monthlyData}
          />
        )}
      />
    </View>
  );
}
