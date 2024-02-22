import { Text } from "@/components/ui";
import { Data } from "@/data";
import rawdata from "@/data.json";
import {
  ArrowLeftSquare,
  ArrowRightSquare,
  Plus,
  icons,
} from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());

  const yearlyData = rawdata
    .map((v) => ({ date: new Date(v.dateString), ...v }))
    .filter((v) => v.date.getFullYear() === year && v.page === "Y");

  return (
    <View style={{ paddingBottom: 20 }}>
      <View className="flex-row items-center gap-3 mb-3">
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
          <MonthlyItems month={index + 1} yearlyData={yearlyData} />
        )}
      />
    </View>
  );
}

function MonthlyItems({
  month,
  yearlyData,
}: {
  month: number;
  yearlyData: Data[];
}) {
  const monthlyData = yearlyData.filter((v) => v.date.getMonth() + 1 === month);
  const uniqueDates = monthlyData
    .filter(
      (v, i, a) =>
        a.findIndex((w) => w.date.getDate() === v.date.getDate()) === i,
    )
    .map((v) => v.date.getDate());
  return (
    <View className="mb-2">
      <Text className="mb-1 text-xl border-b border-neutral-500/30">
        {new Date(2000, month, 0).toLocaleDateString("en-US", {
          month: "short",
        })}
      </Text>
      <FlatList
        data={uniqueDates}
        renderItem={({ item: date }) => (
          <DailyItem date={date} monthlyData={monthlyData} />
        )}
        ListFooterComponent={() => (
          <Pressable className="py-2">
            <Plus color={"white"} size={16} />
          </Pressable>
        )}
      />
    </View>
  );
}

function DailyItem({
  date,
  monthlyData,
}: {
  date: number;
  monthlyData: Data[];
}) {
  const data = monthlyData.filter((v) => v.date.getDate() === date);
  return (
    <View className="flex-row gap-2">
      <Text>{date}</Text>
      <FlatList data={data} renderItem={({ item }) => <Item item={item} />} />
    </View>
  );
}

function Item({ item }: { item: Data }) {
  return (
    <View className="flex-row gap-2 items-center">
      <ItemIcon type={item.type} />
      <Text>{item.content}</Text>
    </View>
  );
}

function ItemIcon({ type }: { type: string }) {
  const iconNames: { [type: string]: keyof typeof icons } = {
    T: "Dot",
    C: "X",
    N: "Minus",
    M: "ChevronLeft",
    D: "ChevronRight",
  };
  const Icon = icons[iconNames[type]];
  return (
    <Pressable>
      <Icon color={"white"} size={16} />
    </Pressable>
  );
}
