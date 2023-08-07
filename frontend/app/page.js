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
      <div className="flex justify-center context-center h-screen">
        <div className="flex flex-col justify-center context-center">
          <Button
            id="refreshButton"
            onClick={() => {
              router.push("/signup");
            }}
            className="mt-6"
            colorScheme="red"
            size="lg"
          >
            SIGNUP
          </Button>
          <Button
            id="refreshButton"
            onClick={() => {
              router.push("/login");
            }}
            className="mt-6"
            colorScheme="red"
            size="lg"
          >
            LOGIN
          </Button>
        </div>
      </div>
    </ChakraProvider>
  );
}
