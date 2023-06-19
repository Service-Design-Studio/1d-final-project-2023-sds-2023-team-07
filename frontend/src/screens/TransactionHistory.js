import React from "react";
import { HStack, Center } from "native-base";

export default function TransactionHistory() {
  return (
    <HStack space={3} justifyContent="center">
      <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
    </HStack>
  );
}
