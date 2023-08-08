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
  const router = useRouter();
  const [ic, setIc] = useState();

  const handleInputChange = (event) => {
    setIc(event.target.value);
  };

  return (
    <ChakraProvider>
      <div className="flex h-screen flex-col justify-center items-center">
        <Input
          onChange={(e) => {
            handleInputChange(e);
          }}
          focusBorderColor="red"
          placeholder="IC"
          size="lg"
          value={ic}
        />
        <Button
          key="nextButton"
          className="mt-6"
          colorScheme="red"
          size="md"
          type="button"
          onClick={() => {
            router.push(`/camera?ic=${ic}`);
          }}
        >
          Next
        </Button>
      </div>
    </ChakraProvider>
  );
}
