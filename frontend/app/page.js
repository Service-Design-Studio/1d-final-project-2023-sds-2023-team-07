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

  async function checkifloggedin() {
    const response2 = await fetch("api/user/getLogged", {
      credentials: "same-origin",
      method: "GET",
    });

    const data2 = await response2.json();
    if (!response2.ok) {
      throw new Error(data2.message || "Failed to post data to /login");
    } else {
      console.log(data2);
      console.log("success");
    }
  }
  useEffect(() => {
    // if (document.cookie) {
    //   router.push("/transactionHistory");
    // }
    // setCookie(false);
    checkifloggedin();
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
