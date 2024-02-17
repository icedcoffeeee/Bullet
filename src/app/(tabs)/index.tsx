import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text className="text-primary text-3xl">
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </Text>
    </View>
  );
}
