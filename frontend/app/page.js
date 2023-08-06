"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <ChakraProvider>
      <div>
        base
        <div>
          <Button
            id="refreshButton"
            onClick={() => {
              router.push("/signup");
            }}
            className="mt-6"
            colorScheme="red"
            size="md"
          >
            SIGNUP
          </Button>
          <Button
            id="refreshButton"
            onClick={() => {
              router.push("/transactionHistory");
            }}
            className="mt-6"
            colorScheme="red"
            size="md"
          >
            LOGIN
          </Button>
        </div>
      </div>
    </ChakraProvider>
  );
}
