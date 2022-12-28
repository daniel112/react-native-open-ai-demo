import * as React from "react";
import {
  StyleProp,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Text,
  SafeAreaView,
} from "react-native";
import { createWormhole } from "react-native-wormhole";
// @ts-ignore
import * as Babel from "@babel/standalone";

import { useCompletion } from "../hooks";
/**
 * Notes for Wormhole
 * - Wormhole attempts to create a js function via the passed in transpiled string or uri
 * see createWormhole.js > buildCreateComponent() in node_modules
 * - Because we're trusting the AI to generate the code, if the AI generated code is not syntactically correct, it can crash the app
 */
const { Wormhole: DefaultWormhole } = createWormhole({
  global: {
    require: (moduleId: string) => {
      if (moduleId === "react") {
        return require("react");
      } else if (moduleId === "react-native") {
        return require("react-native");
      } else if (moduleId === "react-native-paper") {
        return require("react-native-paper");
      }
      return null;
    },
  },
  verify: () => Promise.resolve(true),
});

function Prompt<T>({
  completionSettings,
  style,
  debug = false,
  extraProps,
  Wormhole = DefaultWormhole,
  prompt,
}: {
  readonly prompt?: string;
  readonly completionSettings: Omit<
    Parameters<typeof useCompletion>[0],
    "prompt"
  >;
  readonly style?: StyleProp<ViewStyle>;
  readonly debug?: boolean;
  readonly extraProps?: T;
  readonly Wormhole?: ReturnType<typeof createWormhole>["Wormhole"];
}): JSX.Element {
  const { completion, error, loading } = useCompletion({
    ...completionSettings,
    prompt,
  });

  const choice =
    completion?.choices?.[0]?.text ||
    "import * as React from 'react'; export default React.Fragment;";
  console.log({ choice });
  const onError = React.useCallback(() => undefined, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style}>
      <Wormhole
        {...extraProps}
        source={Babel.transform(choice, { presets: ["es2015", "react"] }).code}
        dangerouslySetInnerJSX
        onError={onError}
      />
      {Boolean(debug) && !!(choice || error) && (
        <ScrollView style={StyleSheet.absoluteFill}>
          <Text children={choice || String(error)} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default React.memo(Prompt);
