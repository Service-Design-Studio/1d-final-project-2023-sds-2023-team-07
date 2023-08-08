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
      router.push("/transactionhistory");
    }
    setCookie(false);
  }, []);

  return (
    <ChakraProvider>{cookie === null ? <Spinner /> : <Base />}</ChakraProvider>
  );
}
