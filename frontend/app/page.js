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

export default function page() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState([]);
  const [isLandscape, setIsLandscape] = useState(null);
  const [pageState, setPageState] = useState("loading");

  const handleClick = () => {
    router.push("/camera");
  };

  useEffect(() => {
    setIsLandscape(window.innerHeight < window.innerWidth);
    window.addEventListener("resize", () => {
      setIsLandscape(window.innerHeight < window.innerWidth);
    });
    fetch(
      "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions"
    )
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
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Transaction</Th>
                    <Th>Amount Left</Th>
                    {isLandscape ? <Th>Transaction Code</Th> : <div></div>}
                  </Tr>
                </Thead>
                <Tbody>
                  {fetchData.map((row) => (
                    <Tr key={row.id}>
                      <Td>{new Date(row.created_at).toLocaleDateString()}</Td>
                      <Td>{`${row.transaction_type === "deposit" ? "+" : "-"}${
                        row.amount
                      }`}</Td>
                      <Td>{row.user_balance_left + "0"}</Td>
                      {isLandscape ? (
                        <Td>{row.transaction_type}</Td>
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
                  onClick={handleClick}
                  className="grow"
                  colorScheme="red"
                  size="md"
                >
                  WITHDRAW
                </Button>
                <Button
                  onClick={handleClick}
                  className="grow ml-3"
                  colorScheme="red"
                  size="md"
                >
                  DEPOSIT
                </Button>
              </div>
              <div className="grow">
                <Button className="w-full" colorScheme="red" size="md">
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
            errorMsg={"Sorry our services seem to be down at the moment :("}
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
