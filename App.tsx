import "react-native-url-polyfill/auto";

import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert, View } from "react-native";
import Constants from "expo-constants";
import { Prompt } from "./src/components";
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
          "A complete example of React Native functional component with two rows. first row is a horizontal scrollview of images, with https://cataas.com/cat as the source uri Second row is a vertical flatList underneath with hard-coded strings.",
          // "Images are fetched using fetch API from https://imgur.com/",
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
