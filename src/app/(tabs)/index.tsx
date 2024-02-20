import { Item, ItemButton, ItemType } from "@/components/items";
import { FlatList, Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text className="text-primary text-3xl mb-3">
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item: { type, content, children } }) => (
          <Item type={type} content={content} children={children} />
        )}
      />
      <ItemButton />
    </View>
  );
}

const data = [
  {
    type: ItemType.COMPLETED,
    content: "Meeting at 9",
    children: [{ type: ItemType.TODO, content: "Minutes due" }],
  },
  { type: ItemType.COMPLETED, content: "Follow up on venue" },
  { type: ItemType.COMPLETED, content: "Setup with technical team" },
  { type: ItemType.TODO, content: "Site visit" },
  { type: ItemType.NOTE, content: "Might need to confirm with Josh" },
];
