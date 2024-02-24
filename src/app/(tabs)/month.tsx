import { DailyItem } from "@/app/(tabs)/year";
import { Text } from "@/components/ui";
import { Data, getMonthlyData, updateData } from "@/lib/data";
import { getNumberOfDays, getWeekdayOffset } from "@/lib/utils/dateUtils";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Page() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(updateData(setData), []);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const numDays = getNumberOfDays(month, year);
  const monthlyData = getMonthlyData(data, month, year);
  const weekdayOffset = getWeekdayOffset(month, year);

  return (
    <View className="flex-1">
      <Text className="text-2xl mb-3">
        {new Date(year, month).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </Text>

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
