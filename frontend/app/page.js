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
import Error from "./Error";
import { DataTable } from "./DataTable";

export default function Page() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState([]);
  const [isLandscape, setIsLandscape] = useState(null);
  const [pageState, setPageState] = useState("main");

  const handleClick = () => {
    router.push("/camera");
  };

  const handleSpeechClick = () => {
    router.push("/speech");
  };

  useEffect(() => {
    setIsLandscape(window.innerHeight < window.innerWidth);
    window.addEventListener("resize", () => {
      setIsLandscape(window.innerHeight < window.innerWidth);
    });
    fetch("https://kelvin-build-ml42q3c3ya-as.a.run.app/transactions?user=1")
      .then((response) => {
        console.log("Response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setFetchData(data);
        setPageState("main");
      })
      .catch((error) => {
        setPageState("error");
        console.error("Error:", error);
      });
  }, []);
  console.log();

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
      case "main":
        return (
          <main className="flex max-h-screen flex-col items-center justify-between">
            <div className="h-5/6 overflow-scroll w-full">
              <Table id="transactions">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Transaction</Th>
                    <Th>Amount Left</Th>
                    {isLandscape ? <Th>Transaction Code</Th> : <div></div>}
                  </Tr>
                </Thead>
                <Tbody>
                  {fetchData
                    .slice(0)
                    .reverse()
                    .map((row, key) => (
                      <Tr key={row.id}>
                        <Td id={`date-${key}`}>
                          {new Date(row.created_at).toLocaleDateString()}
                        </Td>
                        <Td id={`amount-${key}`}>{`${
                          row.transaction_type === "NCD" ? "+" : "-"
                        }${row.amount}`}</Td>
                        <Td id={`balance-${key}`}>
                          {row.user_balance_left + "0"}
                        </Td>
                        {isLandscape ? (
                          <Td id={`type-${key}`}>{row.transaction_type}</Td>
                        ) : (
                          <div></div>
                        )}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </div>
            <div className="h-1/6 pt-2 pb-2 content-stretch w-full pl-2 pr-2">
              <div className="flex justify-between mb-3">
                <Button
                  onClick={() => {
                    router.push("/camera?pageState=select");
                  }}
                  className="grow"
                  colorScheme="red"
                  size="md"
                >
                  WITHDRAW
                </Button>
                <Button
                  onClick={() => {
                    router.push("/camera?pageState=deposit");
                  }}
                  className="grow ml-3"
                  colorScheme="red"
                  size="md"
                >
                  DEPOSIT
                </Button>
              </div>
              <div className="grow">
                <Button
                  className="w-full"
                  colorScheme="red"
                  size="md"
                  onClick={handleSpeechClick}
                >
                  ACTIVATE SPEECH-TO-TEXT
                </Button>
              </div>
            </div>
          </main>
        );

        break;
      case "error":
        return (
          <Error
            errorMsg={"Sorry our services seem to be down at the moment"}
            subText={"Try again in around 30 mins!"}
          />
        );
        break;
      default:
        return null;
        break;
    }
  };

  return <ChakraProvider>{renderPage()}</ChakraProvider>;
}
