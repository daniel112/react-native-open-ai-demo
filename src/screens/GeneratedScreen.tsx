import "react-native-url-polyfill/auto";

import * as React from "react";
import { Alert, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Prompt } from "../components";
import { useRoute } from "@react-navigation/native";
import { GeneratedRouteProp } from "../types/types";

export const GeneratedScreen = () => {
  console.log(Constants?.expoConfig?.extra?.openAiApiKey);

  const route = useRoute<GeneratedRouteProp>();
  const { promptText } = route.params;
  console.log(promptText);
  return (
    <>
      <Prompt
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
        // debug
        completionSettings={React.useMemo(
          () => ({
            max_tokens: 4000,
            apiKey: String(Constants?.expoConfig?.extra?.openAiApiKey),
            model: "text-davinci-003",
          }),
          []
        )}
        extraProps={React.useMemo(
          () => ({
            onPress: (message: string) => Alert.alert(message),
          }),
          []
        )}
        prompt={promptText}
      />
    </>
  );
};
