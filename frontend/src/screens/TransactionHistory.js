import React, { useEffect, useState } from "react";
import { Searchbar, DataTable } from "react-native-paper";
import { DeviceMotion } from "expo-sensors";
import TransactionHistorySide from "./TransactionHistorySide";
import ErrorPage from "./ErrorPage";
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

export default function TransactionHistory(props) {
  const { screen } = props;
  const [search, useSearch] = useState("");
  const [orientation, setOrientation] = useState(null);
  const [masterData, useMasterData] = useState([
    {
      date: "190916",
      transaction: "+100",
      amountLeft: "100",
    },
    {
      date: "190916",
      transaction: "+200",
      amountLeft: "300",
    },
    {
      date: "190916",
      transaction: "+300",
      amountLeft: "600",
    },
    {
      date: "190916",
      transaction: "+400",
      amountLeft: "1,000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "1,500",
    },
    {
      date: "190916",
      transaction: "-500",
      amountLeft: "1,000",
    },
    {
      date: "190916",
      transaction: "-400",
      amountLeft: "600",
    },
    {
      date: "190916",
      transaction: "-300",
      amountLeft: "300",
    },
    {
      date: "190916",
      transaction: "-200",
      amountLeft: "100",
    },
    {
      date: "190916",
      transaction: "-100",
      amountLeft: "0",
    },
    {
      date: "190916",
      transaction: "+100",
      amountLeft: "100",
    },
    {
      date: "190916",
      transaction: "+200",
      amountLeft: "300",
    },
    {
      date: "190916",
      transaction: "+300",
      amountLeft: "600",
    },
    {
      date: "190916",
      transaction: "+400",
      amountLeft: "1,000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "1,500",
    },
    {
      date: "190916",
      transaction: "-500",
      amountLeft: "1,000",
    },
    {
      date: "190916",
      transaction: "-400",
      amountLeft: "600",
    },
    {
      date: "190916",
      transaction: "-300",
      amountLeft: "300",
    },
    {
      date: "190916",
      transaction: "-200",
      amountLeft: "100",
    },
    {
      date: "190916",
      transaction: "-100",
      amountLeft: "0",
    },
    {
      date: "190916",
      transaction: "+100",
      amountLeft: "100",
    },
    {
      date: "190916",
      transaction: "+200",
      amountLeft: "300",
    },
    {
      date: "190916",
      transaction: "+300",
      amountLeft: "600",
    },
    {
      date: "190916",
      transaction: "+400",
      amountLeft: "1,000",
    },
    {
      date: "190916",
      transaction: "+500",
      amountLeft: "1,500",
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
    buttonFullTransac: {
      backgroundColor: "red",
      padding: 20,
      borderRadius: 5,
      marginTop: 10,
      width: BUTTON_WIDTH_2,
      alignItems: "center",
      textAlign: "center",
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
    cellContent: {
      textAlign: "center",
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
    row: {
      width: width,
      height: 40,
      flexDirection: "row",
      borderTopColor: "black",
      borderTopWidth: 1,
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
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
      padding: 10,
    },
  });

  const [fetchData, useFetchData] = useState([]);

  const changeOrientation = async (orientationToChange) => {
    if (orientationToChange == 0 && orientation != "up") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation("up");
    } else if (orientationToChange == -90) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
      setOrientation("left");
    }
  };

  let lastExecutionTime = 0;

  useEffect(() => {
    // fetch("https://backend-dbs-grp7-E-as.a.run.app/users/1/transactions")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Fetched data:", data);
    //     useFetchData(data);
    //     useScreen("main");
    //   })
    //   .catch((error) => {
    //     useScreen("error");
    //     console.error("Error:", error);
    //   });
    // // Listen to orientation change every 3 seconds
    // DeviceMotion.addListener(({ orientation, rotation }) => {
    //   const currentTime = Date.now();
    //   if (currentTime - lastExecutionTime >= 3000) {
    //     changeOrientation(orientation);
    //     lastExecutionTime = currentTime;
    //   }
    // });
    // const { width, height } = Dimensions.get("window");
  }, []);

  // console.log(masterData);

  // return orientation == "loading" ? (
  //   <View></View>
  // ) : orientation == "up" ? (
  return screen == "loading" ? (
    <Text>Loading</Text>
  ) : screen == "error" ? (
    <ErrorPage></ErrorPage>
  ) : orientation == "left" ? (
    <TransactionHistorySide></TransactionHistorySide>
  ) : (
    <View style={style.container}>
      <View>
        <DataTable style={style.transacHistContainer}>
          <DataTable.Header>
            <DataTable.Title style={style.cell}>Date</DataTable.Title>
            <DataTable.Title style={style.cell}>Transaction</DataTable.Title>
            <DataTable.Title style={style.cell}>Amount Left</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {fetchData.map((row) => (
              <DataTable.Row key={row.id}>
                <DataTable.Cell style={style.cell}>
                  {new Date(row.created_at).toLocaleDateString()}
                </DataTable.Cell>
                <DataTable.Cell style={style.cell}>{`${
                  row.transaction_type === "deposit" ? "+" : "-"
                }${row.amount}`}</DataTable.Cell>
                <DataTable.Cell style={style.cell}>
                  {parseFloat(row.amount) + 1400}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
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
