"use client"; // This is a client component 👈🏽
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
import TableDefault from "../TableDefault";
import Error from "../Error";

export default function Page() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState([]);
  const [isLandscape, setIsLandscape] = useState(null);
  const [pageState, setPageState] = useState("main");

  const handleClick = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    console.log(document.cookie);

    router.push("/");
  };

  const handleSpeechClick = () => {
    router.push("/speech");
  };

  async function getTable() {
    try {
      const url = "api/user/getTable";
      // GET request to fetch the boolean value
      const response = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setFetchData(data);
    } catch (error) {
      console.error("Error while processing requests:", error);
    }
    console.log("a");
  }

  async function logout() {
    fetch("/api/cookie/logout", {
      method: "DELETE",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          // If server returns a non-200/204 status, reject promise with status text
          return Promise.reject(response.statusText);
        }
        return response.json(); // or just return response if you don't need to read the response body
      })
      .then((data) => {
        console.log("Successfully logged out:", data);

        // handle success response if needed
        if (data.message == "Logged out successfully") {
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
  }

  useEffect(() => {
    getTable();
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
              <TableDefault data={fetchData} />
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
                  onClick={logout}
                >
                  LOGOUT
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
