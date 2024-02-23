import { Text } from "@/components/ui";
import { Data, data } from "@/lib/data";
import { icons } from "lucide-react-native";
import { FlatList, Pressable, View } from "react-native";

export function Item({ item }: { item: Data }) {
  return (
    <>
      <View className="flex-row gap-2 items-center">
        <ItemIcon type={item.type} />
        <Text>{item.content}</Text>
      </View>
      {!!item.children && (
        <FlatList
          data={item.children}
          renderItem={({ item }) => (
            <View className="pl-8">
              <Item item={item} />
            </View>
          )}
        />
      )}
    </>
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
