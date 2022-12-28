import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Props } from "../types/types";

export const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = React.useState(
    "A complete example of React Native functional component with two rows. first row is a horizontal scrollview of images, with https://cataas.com/cat as the source uri Second row is a vertical flatList underneath with hard-coded strings."
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 200, marginVertical: 20 }}
        multiline
        label="Prompt"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        icon="file-code"
        mode="contained"
        onPress={() =>
          navigation.navigate("Generated", {
            promptText: text,
          })
        }
      >
        Generate
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
});
