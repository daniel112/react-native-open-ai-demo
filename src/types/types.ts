import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Generated: { promptText: string };
};
export type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home",
  "Generated"
>;

export type GeneratedRouteProp = RouteProp<RootStackParamList, "Generated">;
