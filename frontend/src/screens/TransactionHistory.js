import React, { useState } from "react";
import { HStack, Center } from "native-base";
import { View, Text } from "native-base";
import { SearchBar } from "react-native-elements";

export default function TransactionHistory() {
  const [search, useSearch] = useState("");

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
    </HStack>
  );
}
