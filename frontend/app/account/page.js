"use client"; // This is a client component 👈🏽import React from "react";
import {
  Button,
  PinInput,
  PinInputField,
  ChakraProvider,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState("loading");
  const [amountSelected, setAmountSelected] = useState(null);
  const amountArray = ["10", "20", "50", "100", "200", "500"];
  const router = useRouter();

  const extractQueryString = (urlString) => {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const keyValuePairs = {};

    for (const [key, value] of params.entries()) {
      keyValuePairs[key] = value;
    }

    return keyValuePairs;
  };

  const selectAmount = (event) => {
    const element = event.target;
    const amount = parseInt(element.textContent.slice(1));
    setAmountSelected(amount);
    router.push(`/account?pageState=withdraw`);
    setPageState("withdraw");
  };

  useEffect(() => {
    const params = extractQueryString(window.location.href);
    setPageState(params.pageState);
    console.log(params.pageState);
  }, [pageState]);

  const renderPage = () => {
    switch (pageState) {
      case "loading":
        return (
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
        );
        break;
      case "deposit":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            DEPOSIT
          </div>
        );
        break;
      case "select":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            SELECT
            <div className="grid grid-cols-2 gap-4">
              {amountArray.map((amount, index) => (
                <Button
                  onClick={selectAmount}
                  key={index}
                  className="mt-6 p-6"
                  colorScheme="gray"
                  size="lg"
                >
                  {"$" + amount}
                </Button>
              ))}
            </div>
            <Button className="mt-6" colorScheme="red" size="md">
              RETURN TO HOMEPAGE
            </Button>
          </div>
        );
        break;
      case "withdraw":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            {amountSelected}
          </div>
        );
        break;
    }
  };

  return (
    <ChakraProvider>
      <div className="flex justify-center context-center h-screen">
        {renderPage()}
      </div>
    </ChakraProvider>
  );
}
