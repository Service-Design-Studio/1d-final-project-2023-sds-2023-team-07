import React, { useState } from "react";
import { HStack, Center } from "native-base";
import { View, Text } from "native-base";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function TransactionHistory() {
  const [search, useSearch] = useState("");
  const style = StyleSheet.create({
    button: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  const WithdrawBtn = () => {
    return (
      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>WITHDRAW</Text>
      </TouchableOpacity>
    );
  };
  const DepositBtn = () => {
    return (
      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>DEPOSIT</Text>
      </TouchableOpacity>
    );
  };
  const ActivateBtn = () => {
    return (
      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>ACTIVATE SPEECH-TO-TEXT</Text>
      </TouchableOpacity>
    );
  };

  const handleChange = (val) => {
    useSearch(val);
  };

  return (
    <HStack space={3} justifyContent="center" flexDirection="column">
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleChange}
        value={search}
      />
      <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
      <View style={style.container}>
        <WithdrawBtn/>
        <DepositBtn/>
        <ActivateBtn/>
      </View>

    </HStack>
  );

  
}
