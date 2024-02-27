import { Text } from "@/components/ui";
import { Data } from "@/lib/data";
import { DB, useDB } from "@/lib/stores/dbStore";
import { Plus, icons } from "lucide-react-native";
import { FlatList, Pressable, PressableProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

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

export function AddButton({
  className,
  dbFunction,
  ...props
}: PressableProps & {
  dbFunction?: (user: DB["user"]) => PressableProps["onPress"];
}) {
  const { user } = useDB(({ user }) => ({ user }));
  return (
    <Pressable
      className={twMerge("py-2", className)}
      onPress={dbFunction && dbFunction(user)}
      {...props}
    >
      <Plus color={"white"} size={16} />
    </Pressable>
  );
}
