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

// const { width, height } = Dimensions.get("window");

const width = 770;
const height = 440;

const CONTAINER_HEIGHT = height * 1;
const TRANSACTION_HISTORY_HEIGHT = height * 0.7;
const BUTTON_WIDTH_1 = width * 0.46;
const BUTTON_WIDTH_2 = width * 0.97;
const SEARCH_WIDTH = width * 0.97;

console.log(width);

export default function TransactionHistory() {
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
      justifyContent: "space-around",
      alignItems: "center",
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

  return (
    <View style={style.container}>
      <View>
        <DataTable style={style.transacHistContainer}>
          <DataTable.Header>
            <DataTable.Title style={style.cell}>Date</DataTable.Title>
            <DataTable.Title style={style.cell}>Transaction</DataTable.Title>
            <DataTable.Title style={style.cell}>Amount Left</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {masterData.map((row) => (
              <DataTable.Row key={row.id}>
                <DataTable.Cell style={style.cell}>{row.date}</DataTable.Cell>
                <DataTable.Cell style={style.cell}>
                  {row.transaction}
                </DataTable.Cell>
                <DataTable.Cell style={style.cell}>
                  {row.amountLeft}
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
