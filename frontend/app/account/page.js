"use client"; // This is a client component 👈🏽import React from "react";
import {
  Button,
  PinInput,
  PinInputField,
  ChakraProvider,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function Page() {
  const [pageState, setPageState] = useState("loading");
  const [amountSelected, setAmountSelected] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [id, setid] = useState("");
  const [pin, setPin] = useState("");
  const amountArray = ["10", "20", "50", "100", "200", "500"];
  const router = useRouter();
  const qrRef = useRef(null);

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
    setPageState("withdraw");
  };

  async function checkPatchRecursion() {
    try {
      const url = "api/user/getUser";
      // GET request to fetch the boolean value
      const response = await fetch(url, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      // Check if the boolean has turned from false to true
      const currentValue = data["is_active"];
      console.log(currentValue);
      if (currentValue === 1) {
        // If it's true, send a PATCH request to change it back to false
        await fetch("api/user/patchUser", {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ["is_active"]: 0 }),
        });
        router.push("/success");
        console.log("GO TO SUCCESS");
      } else if (currentValue === 2) {
        // If it's true, send a PATCH request to change it back to false
        await fetch("api/user/patchUser", {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ["is_active"]: 0,
          }),
        });
        router.push("/fail");
        console.log("GO TO FAIL");
      } else {
        // If it's still false, continue the check after one second
        setTimeout(() => checkPatchRecursion(), 1000);
      }
    } catch (error) {
      console.error("Error while processing requests:", error);
    }
    console.log("a");
  }

  useEffect(() => {
    const params = extractQueryString(window.location.href);
    setPageState(params.pageState);
    console.log(pageState);
    if (pageState == "qr") {
      console.log("b");
      checkPatchRecursion();
    }
    console.log("firing");
  }, []);

  async function getUser() {
    const url = "api/user/getUser";
    // GET request to fetch the boolean value
    const response = await fetch(url, {
      credentials: "cross-origin",
      method: "GET",
    });
    const data = await response.json();
    setid(data.identification_number);
    setPin(data.pin);
  }

  useEffect(() => {
    console.log(pageState);
    if (pageState == "qr") {
      console.log("b");
      checkPatchRecursion();
      getUser();
    }
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
            Confirm to Deposit?
            <Button
              onClick={() => {
                router.push("/transactionHistory");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              NO
            </Button>
            <Button
              onClick={() => {
                setQrData({
                  user_id: 0,
                  identification_number: id,
                  pin: pin,
                  transaction_type: "NCD",
                  amount: null,
                });
                setPageState("qr");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              YES
            </Button>
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
            <Button
              onClick={() => {
                router.push("/transactionHistory");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              RETURN TO HOMEPAGE
            </Button>
          </div>
        );
        break;
      case "withdraw":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            {`Confirm to Withdraw ${amountSelected} ?`}
            <Button
              onClick={() => {
                router.push("/transactionHistory");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              NO
            </Button>
            <Button
              onClick={() => {
                setQrData({
                  user_id: 0,
                  identification_number: id,
                  pin: pin,
                  transaction_type: "AWL",
                  amount: amountSelected,
                });
                setPageState("qr");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              YES
            </Button>
          </div>
        );
        break;
      case "qr":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="my-6 text-gray-800 font-bold text-2xl">
              SCAN AT ATM
            </h1>
            <QRCode
              ref={qrRef}
              size={256}
              style={{ height: "200px", width: "200px" }}
              value={JSON.stringify(qrData)}
              viewBox={`0 0 256 256`}
            />
            <Button
              onClick={() => {
                router.push("/transactionHistory");
              }}
              className="mt-6"
              colorScheme="red"
              size="md"
            >
              BACK TO HOMEPAGE
            </Button>
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
