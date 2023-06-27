import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionHistory from "./src/screens/TransactionHistory";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [screen, useScreen] = useState("main");

  return (
    <PaperProvider>
      <SafeAreaView>
        <TransactionHistory screen={screen} />
      </SafeAreaView>
    </PaperProvider>
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
