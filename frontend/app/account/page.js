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

  useEffect(() => {
    const params = extractQueryString(window.location.href);
    setPageState(params.pageState);
    console.log(params.pageState);
  });

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
