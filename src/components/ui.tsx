import { TextProps, Text as TextRN } from "react-native";
import { twMerge } from "tailwind-merge";

export function Text({ className, ...props }: TextProps) {
  return <TextRN className={twMerge("text-white", className)} {...props} />;
}
