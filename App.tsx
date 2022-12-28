import "react-native-url-polyfill/auto";

import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert, View } from "react-native";
import Constants from "expo-constants";
import { Prompt } from "./src/components";
import { SafeAreaView } from "react-native";
console.log(Constants?.expoConfig?.extra?.openAiApiKey);

export default function App() {
  return (
    <>
      <Prompt
        style={[StyleSheet.absoluteFill, styles.white]}
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
        prompt={[
          "A complete example of React Native functional component with two rows. first row is a horizontal scrollview of random images. Second row is a vertical flatList underneath with random baby names.",
          "Images are fetched from https://imgur.com/",
          "Make sure all imports are valid.",
        ].join(" ")}
      />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  white: {
    // backgroundColor: "green",
    flex: 1,
    // alignItems: "center",
  },
});
