import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CONTAINER_HEIGHT = height * 1;
const BUTTON_WIDTH_1 = width * 0.46;
const BUTTON_WIDTH_2 = width * 0.97;
const SEARCH_WIDTH = width * 0.97;

export default function TransactionHistory() {
  const [search, useSearch] = useState("");
  const [masterData, useMasterData] = useState([
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "150000",
    },
    {
      date: "200916",
      transaction: "-500",
      amountLeft: "155000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "150000",
    },
    {
      date: "200916",
      transaction: "-500",
      amountLeft: "155000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "150000",
    },
    {
      date: "200916",
      transaction: "-500",
      amountLeft: "155000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "150000",
    },
    {
      date: "200916",
      transaction: "-500",
      amountLeft: "155000",
    },
  ]);

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
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      height: CONTAINER_HEIGHT,
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    activateContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    row: {
      width: width,
      height: 40,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopColor: "black",
      borderTopWidth: 1,
    },
    rowLast: {
      height: 40,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopColor: "black",
      borderTopWidth: 1,
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    search: {
      width: SEARCH_WIDTH,
    },
  });

  const handleChange = (val) => {
    useSearch(val);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  });

  const fetchData = () => {
    const apiURL = "testing";
  };

  console.log(masterData);

  return (
    <View style={style.container}>
      <View style={style.search}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={handleChange}
          value={search}
        />
      </View>
      <View>
        {masterData.map((data, ndx) => {
          const isLast = masterData.length - 1 === ndx;

          return (
            <View style={!isLast ? style.row : style.rowLast} key={data.id}>
              <Text>{data.date}</Text>
              <Text>{data.transaction}</Text>
              <Text>{data.amountLeft}</Text>
            </View>
          );
        })}
      </View>
      <View>
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
    </View>
  );
}
