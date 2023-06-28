import React, { useEffect, useState } from "react";
import { Searchbar, DataTable } from "react-native-paper";
import { DeviceMotion } from "expo-sensors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";

const { width, height } = Dimensions.get("window");

const CONTAINER_HEIGHT = height * 1;
const TRANSACTION_HISTORY_HEIGHT = height * 0.7;
const BUTTON_WIDTH_1 = width * 0.46;
const BUTTON_WIDTH_2 = width * 0.97;
const SEARCH_WIDTH = width * 0.97;

export default function TransactionHistory() {
  const style = StyleSheet.create({    
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },    
    errorText: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 24,
      padding: 50,
    },
    container: {
      width: width,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      height: CONTAINER_HEIGHT,
      overflow: "scroll",
    },
    transacHistContainer: {
      width: width,
      height: TRANSACTION_HISTORY_HEIGHT,
      contentAlign: "right",
      justifyContent: "space-evenly",
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    activateContainer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 70,
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.errorText}>
      Oops 😅{'\n\n'}
      We have some trouble trying to show your transaction history{'\n\n'}
      Try restarting the banking app again{'\n\n'}
      </Text>
    </View>
  );

}
