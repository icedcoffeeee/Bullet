import { BG_COLOR, COLORS, ISLIGHT, TX_COLOR } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
    const { top } = useSafeAreaInsets();

    const pages: {
        name: string;
        title: string;
        icon: keyof typeof Ionicons.glyphMap;
    }[] = [
            { name: "index", title: "Daily", icon: "sunny" },
            { name: "month", title: "Month", icon: "calendar" },
            { name: "year", title: "Year", icon: "moon" },
        ];

    return (
        <Tabs
            sceneContainerStyle={{
                padding: 20,
                paddingTop: 20 + top,
                backgroundColor: BG_COLOR(),
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: TX_COLOR(),
                tabBarStyle: {
                    backgroundColor: COLORS.primary[ISLIGHT() ? 300 : 700],
                    borderTopWidth: 0,
                },
            }}
        >
            {pages.map(({ name, title, icon }, i) => (
                <Tabs.Screen
                    name={name}
                    options={{
                        title,
                        tabBarIcon({ color, size }) {
                            return <Ionicons name={icon} color={color} size={size} />;
                        },
                    }}
                    key={i}
                />
            ))}
        </Tabs>
    );
}
