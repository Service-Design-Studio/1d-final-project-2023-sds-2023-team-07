"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PhoneIcon,
  CheckIcon,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function page() {
  return (
    <ChakraProvider>
      <div className="flex h-screen flex-col justify-center items-center">
        <Button
          key="nextButton"
          className="mt-6"
          colorScheme="red"
          size="md"
          type="button"
        >
          Next
        </Button>
      </div>
    </ChakraProvider>
  );
}
