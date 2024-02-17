import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text className="text-primary text-3xl">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </Text>
    </View>
  );
}
