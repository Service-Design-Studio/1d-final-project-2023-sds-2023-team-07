import React, { useEffect, useState } from "react";
import { Searchbar, DataTable } from "react-native-paper";
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
/*  const [masterData, useMasterData] = useState([
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
    },{
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
    },{
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
*/
  const tableData = [
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
    },{
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
    },{
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
  ];

  const style = StyleSheet.create({
    button: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: BUTTON_WIDTH_2,
    },
    buttonFullTransac:{
      backgroundColor: "red",
      padding: 20,
      borderRadius: 5,
      marginTop: 10,
      width: BUTTON_WIDTH_2,
      alignItems: 'center',
      textAlign: 'center',
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
    },
    transacHistContainer: {
      width: width,
      height: CONTAINER_HEIGHT * 0.7,
      justifyContent: "space-evenly",
      textAlign: "right",
    },
    headerTransacHistContainer: {
      width: width,
      contentAlign: 'right',
      justifyContent: "space-evenly",
    },
    cellContent: {
      textAlign: 'center',
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

  // console.log(masterData);

  return (
    <View style={style.container}>
      <View style={style.search}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={handleChange}
          value={search}
        />
      </View>
      {/* <View>
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
      </View> */}
      <View style={style.transacHistContainer}>
        <ScrollView horizontal>
          <DataTable>
            <View style={style.headerTransacHistContainer}> 
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Transaction</DataTable.Title>
                <DataTable.Title>Amount Left</DataTable.Title>
              </DataTable.Header>
            </View>
            <ScrollView>

              <View style={style.fulltransactionContainer}>
                <TouchableOpacity style={style.buttonFullTransac}>
                  <Text style={style.buttonText}>SHOW FULL TRANSACTION PAGE</Text>
                </TouchableOpacity>
              </View>

              <View> 
                {tableData.map((row) => (
                  <DataTable.Row key={row.id}>
                    <View>
                      <DataTable.Cell >{row.date}</DataTable.Cell>
                    </View>
                    <View>
                      <DataTable.Cell>{row.transaction}</DataTable.Cell>
                    </View>
                    <View>
                      <DataTable.Cell>{row.amountLeft}</DataTable.Cell>
                    </View>
                  </DataTable.Row>
                ))}
              </View>

            </ScrollView>
          </DataTable>
        </ScrollView>
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
