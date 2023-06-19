import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionHistory from "./src/screens/TransactionHistory";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <TransactionHistory />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
