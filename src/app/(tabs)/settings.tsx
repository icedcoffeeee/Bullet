import { useTheme } from "@/lib/theme";
import { Button, Text, View } from "react-native";

export default function Page() {
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <View>
      <Text className="text-primary text-3xl">Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
