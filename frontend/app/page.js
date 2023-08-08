"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
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
import Base from "./Base";

export default function Page() {
  const router = useRouter();
  const [cookie, setCookie] = useState(null);
  useEffect(() => {
    if (document.cookie) {
      router.push("/transactionHistory");
    }
    setCookie(false);
  }, []);

  return (
    <ChakraProvider>
      {cookie === null ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red"
              size="xl"
            />
            <p className="my-2 mt-4 text-gray-800">Loading...</p>
          </div>
        </div>
      ) : (
        <Base />
      )}
    </ChakraProvider>
  );
}
