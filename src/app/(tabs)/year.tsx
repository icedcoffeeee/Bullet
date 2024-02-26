import { AddButton, Item } from "@/components/items";
import { Text } from "@/components/ui";
import { Data, getYearlyData, updateData } from "@/lib/data";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<Data[]>([]);
  useEffect(updateData(setData), []);

  const yearlyData = getYearlyData(data, year);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center gap-3 mb-3">
        <Pressable onPress={() => setYear(year - 1)}>
          <ArrowLeftSquare color={"white"} size={20} />
        </Pressable>
        <Text className="text-2xl">{year}</Text>
        <Pressable onPress={() => setYear(year + 1)}>
          <ArrowRightSquare color={"white"} size={20} />
        </Pressable>
      </View>
      <FlatList
        data={Array(12).fill(0)}
        renderItem={({ index }) => (
          <MonthlyItems month={index + 1} year={year} yearlyData={yearlyData} />
        )}
      />
    </View>
  );
}

function MonthlyItems({
  month,
  year,
  yearlyData,
}: {
  month: number;
  year: number;
  yearlyData: Data[];
}) {
  const monthlyData = yearlyData.filter((v) => v.date.getMonth() + 1 === month);
  const uniqueDates = monthlyData
    .filter(
      (v, i, a) =>
        a.findIndex((w) => w.date.getDate() === v.date.getDate()) === i,
    )
    .map((v) => v.date.getDate());
  const weekdayOffset = new Date(year, month, 1).getDate();
  return (
    <View className="mb-3 p-2 bg-neutral-800 rounded">
      <View className="mb-1 border-b border-neutral-500/30 flex-row items-center justify-between">
        <Text className="text-xl">
          {new Date(2000, month, 0).toLocaleDateString("en-US", {
            month: "short",
          })}
        </Text>
        <AddButton className="py-0 px-2" />
      </View>
      <FlatList
        data={uniqueDates}
        renderItem={({ item: date }) => (
          <DailyItem
            date={date}
            offset={weekdayOffset}
            monthlyData={monthlyData}
          />
        )}
        // ListFooterComponent={<AddButton />}
      />
    </View>
  );
}

export function DailyItem({
  date,
  offset,
  monthlyData,
}: {
  date: number;
  offset: number;
  monthlyData: Data[];
}) {
  const day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][
    (date + offset - 2) % 7
  ];
  const data = monthlyData.filter((v) => v.date.getDate() === date);
  return (
    <View className="flex-row gap-2">
      <Text className="w-6 text-right">{date}</Text>
      <Text className="w-8 border-r border-neutral-500/30">{day}</Text>
      <FlatList data={data} renderItem={Item} />
    </View>
  );
}
