import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const BUTTON_WIDTH_1 = width * 0.46;
const BUTTON_WIDTH_2 = width * 0.97;
console.log(BUTTON_WIDTH_2);
console.log(BUTTON_WIDTH_1);

export default function TransactionHistory() {
  const [search, useSearch] = useState("");
  const style = StyleSheet.create({
    button: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: BUTTON_WIDTH_2,
    },
    buttonAction: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: BUTTON_WIDTH_1,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    container: {
      justifyContent: "center",
      flexDirection: "column",
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    activateContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });
  const handleChange = (val) => {
    useSearch(val);
  };

  return (
    <View style={style.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleChange}
        value={search}
      />
      <View style={style.actionContainer}>
        <TouchableOpacity style={style.buttonAction}>
          <Text style={style.buttonText}>WITHDRAW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonAction}>
          <Text style={style.buttonText}>DEPOSIT</Text>
        </TouchableOpacity>
      </View>
      <View style={style.activateContainer}>
        <TouchableOpacity style={style.button}>
          <Text style={style.buttonText}>ACTIVATE SPEECH-TO-TEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
