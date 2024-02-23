import { Plus } from "lucide-react-native";
import {
  Pressable,
  PressableProps,
  TextProps,
  Text as TextRN,
} from "react-native";
import { twMerge } from "tailwind-merge";

export function Text({ className, ...props }: TextProps) {
  return (
    <TextRN className={twMerge("text-white text-lg", className)} {...props} />
  );
}

export function AddButton({ className, ...props }: PressableProps) {
  return (
    <Pressable className={twMerge("py-2", className)} {...props}>
      <Plus color={"white"} size={16} />
    </Pressable>
  );
}
