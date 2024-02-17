import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text className="text-primary text-3xl">{new Date().getFullYear()}</Text>
    </View>
  );
}
