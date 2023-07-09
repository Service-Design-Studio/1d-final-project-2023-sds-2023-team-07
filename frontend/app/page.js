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
} from "@chakra-ui/react";
import { DataTable } from "./DataTable";

export default function Home() {
  const [fetchData, useFetchData] = useState([]);

  useEffect(() => {
    fetch(
      "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users/1/transactions"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        useFetchData(data);
      })
      .catch((error) => {
        useScreen("error");
        console.error("Error:", error);
      });
  }, []);
  return (
    <ChakraProvider>
      <main className="flex max-h-screen flex-col items-center justify-between">
        <div className="h-5/6 overflow-scroll">
          <Table>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Transaction</Th>
                <Th>Amount Left</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fetchData.map((row) => (
                <Tr key={row.id}>
                  <Td>{new Date(row.created_at).toLocaleDateString()}</Td>
                  <Td>{`${row.transaction_type === "deposit" ? "+" : "-"}${
                    row.amount
                  }`}</Td>
                  <Td>{parseFloat(row.amount) + 1400}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
        <div className="h-1/6 pt-2 pb-2 content-stretch w-100">
          <div className="flex justify-between mb-3">
            <Button className="grow" colorScheme="red" size="md">
              WITHDRAW
            </Button>
            <Button className="grow ml-3" colorScheme="red" size="md">
              DEPOSIT
            </Button>
          </div>
          <div>
            <Button colorScheme="red" size="md">
              ACTIVATE SPEECH-TO-TEXT
            </Button>
          </div>
        </div>
      </main>
    </ChakraProvider>
  );
}
