import { AddButton, Item } from "@/components/items";
import { Text } from "@/components/ui";
import { Data, getDailyData, updateData } from "@/lib/data";
import { DB } from "@/lib/stores/dbStore";
import { Link } from "expo-router";
import { Settings } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Page() {
  const today = new Date();
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
        ListFooterComponent={<AddButton dbFunction={addItem} />}
      />
    </View>
  );
}

function addItem(db: DB["db"]) {
  return async function () {
    await db.insert({
      type: "T",
      content: "",
      dateString: new Date().toISOString(),
      planned: false,
    });
  };
}
