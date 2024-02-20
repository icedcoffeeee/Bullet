import { useTheme } from "@/lib/theme";
import { icons } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Swipeable, gestureHandlerRootHOC } from "react-native-gesture-handler";

export enum ItemType {
  TODO,
  COMPLETED,
  NOTE,
  DELEGATED,
  MIGRATED,
}

export type Unit = {
  type: ItemType;
  content: string;
  children?: Unit[];
};

export function Item({
  type: currentType,
  content: currentContent,
  children,
}: Unit) {
  const Gestures = gestureHandlerRootHOC(View);
  const backgroundColor = useTheme(({ bg_color }) => bg_color);

  const [content, setContent] = useState(currentContent);
  return (
    <Gestures>
      <Swipeable
        renderLeftActions={() => <ItemButton itemType={ItemType.DELEGATED} />}
        renderRightActions={() => <ItemButton itemType={ItemType.MIGRATED} />}
      >
        <View className="flex-row items-center" style={{ backgroundColor }}>
          <ItemButton itemType={currentType} />
          <TextInput
            value={content}
            onChangeText={setContent}
            className="text-primary text-2xl"
          />
        </View>
      </Swipeable>
      {children && (
        <View className="pl-8">
          {children.map(({ type, content, children }, i) => (
            <Item type={type} content={content} children={children} key={i} />
          ))}
        </View>
      )}
    </Gestures>
  );
}

export function ItemButton({ itemType: currentType }: { itemType?: ItemType }) {
  const tx_color = useTheme(({ tx_color }) => tx_color);
  const [type, setType] = useState(currentType);

  function handleItemPress() {
    const taskItems = [ItemType.TODO, ItemType.COMPLETED];
    const transferItems = [ItemType.DELEGATED, ItemType.MIGRATED];
    if (taskItems.includes(type)) {
      return setType(taskItems[1 - type]);
    }
    if (transferItems.includes(type)) {
      // TODO
    }
  }

  const iconNames: (keyof typeof icons)[] = [
    "Dot",
    "X",
    "Minus",
    "ChevronLeft",
    "ChevronRight",
  ];
  const Icon = icons[iconNames[type] ?? "Plus"];

  return (
    <Pressable className="rounded self-start p-2" onPress={handleItemPress}>
      <Icon color={tx_color} />
    </Pressable>
  );
}
