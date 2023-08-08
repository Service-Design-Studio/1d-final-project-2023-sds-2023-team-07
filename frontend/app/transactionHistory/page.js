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
    // setIsLandscape(window.innerHeight < window.innerWidth);
    // window.addEventListener("resize", () => {
    //   setIsLandscape(window.innerHeight < window.innerWidth);
    // });
    // fetch("https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/transactions")
    //   .then((response) => {
    //     console.log("Response: ", response);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Fetched data:", data);
    //     setFetchData(data);
    //     setPageState("main");
    //   })
    //   .catch((error) => {
    //     setPageState("error");
    //     console.error("Error:", error);
    //   });
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
              <TableDefault
                data={[
                  {
                    id: 5,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "21.0",
                    user_balance_left: "1979.0",
                    atm_balance_left: "14974.0",
                    created_at: "2023-07-05T12:29:31.555Z",
                    updated_at: "2023-07-05T12:29:31.555Z",
                  },
                  {
                    id: 6,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "27.0",
                    user_balance_left: "2006.0",
                    atm_balance_left: "15001.0",
                    created_at: "2023-07-05T12:29:31.559Z",
                    updated_at: "2023-07-05T12:29:31.559Z",
                  },
                  {
                    id: 9,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "85.0",
                    user_balance_left: "1921.0",
                    atm_balance_left: "14927.0",
                    created_at: "2023-07-05T12:29:31.568Z",
                    updated_at: "2023-07-05T12:29:31.568Z",
                  },
                  {
                    id: 11,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "58.0",
                    user_balance_left: "1863.0",
                    atm_balance_left: "14869.0",
                    created_at: "2023-07-05T12:29:31.574Z",
                    updated_at: "2023-07-05T12:29:31.574Z",
                  },
                  {
                    id: 14,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "AWL",
                    amount: "21.0",
                    user_balance_left: "1842.0",
                    atm_balance_left: "9982.0",
                    created_at: "2023-07-05T12:29:31.584Z",
                    updated_at: "2023-07-05T12:29:31.584Z",
                  },
                  {
                    id: 15,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "90.0",
                    user_balance_left: "1752.0",
                    atm_balance_left: "14877.0",
                    created_at: "2023-07-05T12:29:31.587Z",
                    updated_at: "2023-07-05T12:29:31.587Z",
                  },
                  {
                    id: 19,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "NCD",
                    amount: "16.0",
                    user_balance_left: "1768.0",
                    atm_balance_left: "9985.0",
                    created_at: "2023-07-05T12:29:31.603Z",
                    updated_at: "2023-07-05T12:29:31.603Z",
                  },
                  {
                    id: 21,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "NCD",
                    amount: "93.0",
                    user_balance_left: "1861.0",
                    atm_balance_left: "10030.0",
                    created_at: "2023-07-05T12:29:31.610Z",
                    updated_at: "2023-07-05T12:29:31.610Z",
                  },
                  {
                    id: 23,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "16.0",
                    user_balance_left: "1877.0",
                    atm_balance_left: "14762.0",
                    created_at: "2023-07-05T12:29:31.617Z",
                    updated_at: "2023-07-05T12:29:31.617Z",
                  },
                  {
                    id: 25,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "66.0",
                    user_balance_left: "1943.0",
                    atm_balance_left: "14828.0",
                    created_at: "2023-07-05T12:29:31.623Z",
                    updated_at: "2023-07-05T12:29:31.623Z",
                  },
                  {
                    id: 26,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "60.0",
                    user_balance_left: "1883.0",
                    atm_balance_left: "14768.0",
                    created_at: "2023-07-05T12:29:31.627Z",
                    updated_at: "2023-07-05T12:29:31.627Z",
                  },
                  {
                    id: 27,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "AWL",
                    amount: "31.0",
                    user_balance_left: "1852.0",
                    atm_balance_left: "10084.0",
                    created_at: "2023-07-05T12:29:31.630Z",
                    updated_at: "2023-07-05T12:29:31.630Z",
                  },
                  {
                    id: 29,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "74.0",
                    user_balance_left: "1778.0",
                    atm_balance_left: "14741.0",
                    created_at: "2023-07-05T12:29:31.636Z",
                    updated_at: "2023-07-05T12:29:31.636Z",
                  },
                  {
                    id: 30,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "AWL",
                    amount: "89.0",
                    user_balance_left: "1689.0",
                    atm_balance_left: "9995.0",
                    created_at: "2023-07-05T12:29:31.639Z",
                    updated_at: "2023-07-05T12:29:31.639Z",
                  },
                  {
                    id: 34,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "NCD",
                    amount: "13.0",
                    user_balance_left: "1702.0",
                    atm_balance_left: "9961.0",
                    created_at: "2023-07-05T12:29:31.652Z",
                    updated_at: "2023-07-05T12:29:31.652Z",
                  },
                  {
                    id: 35,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "7.0",
                    user_balance_left: "1709.0",
                    atm_balance_left: "14691.0",
                    created_at: "2023-07-05T12:29:31.656Z",
                    updated_at: "2023-07-05T12:29:31.656Z",
                  },
                  {
                    id: 36,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "NCD",
                    amount: "27.0",
                    user_balance_left: "1736.0",
                    atm_balance_left: "9988.0",
                    created_at: "2023-07-05T12:29:31.659Z",
                    updated_at: "2023-07-05T12:29:31.659Z",
                  },
                  {
                    id: 38,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "61.0",
                    user_balance_left: "1797.0",
                    atm_balance_left: "14715.0",
                    created_at: "2023-07-05T12:29:31.666Z",
                    updated_at: "2023-07-05T12:29:31.666Z",
                  },
                  {
                    id: 40,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "AWL",
                    amount: "46.0",
                    user_balance_left: "1751.0",
                    atm_balance_left: "9970.0",
                    created_at: "2023-07-05T12:29:31.674Z",
                    updated_at: "2023-07-05T12:29:31.674Z",
                  },
                  {
                    id: 41,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "83.0",
                    user_balance_left: "1668.0",
                    atm_balance_left: "14632.0",
                    created_at: "2023-07-05T12:29:31.677Z",
                    updated_at: "2023-07-05T12:29:31.677Z",
                  },
                  {
                    id: 42,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "42.0",
                    user_balance_left: "1626.0",
                    atm_balance_left: "14590.0",
                    created_at: "2023-07-05T12:29:31.680Z",
                    updated_at: "2023-07-05T12:29:31.680Z",
                  },
                  {
                    id: 43,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "64.0",
                    user_balance_left: "1562.0",
                    atm_balance_left: "14526.0",
                    created_at: "2023-07-05T12:29:31.683Z",
                    updated_at: "2023-07-05T12:29:31.683Z",
                  },
                  {
                    id: 44,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "79.0",
                    user_balance_left: "1483.0",
                    atm_balance_left: "14447.0",
                    created_at: "2023-07-05T12:29:31.686Z",
                    updated_at: "2023-07-05T12:29:31.686Z",
                  },
                  {
                    id: 46,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "NCD",
                    amount: "63.0",
                    user_balance_left: "1546.0",
                    atm_balance_left: "14433.0",
                    created_at: "2023-07-05T12:29:31.693Z",
                    updated_at: "2023-07-05T12:29:31.693Z",
                  },
                  {
                    id: 47,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "AWL",
                    amount: "33.0",
                    user_balance_left: "1513.0",
                    atm_balance_left: "9937.0",
                    created_at: "2023-07-05T12:29:31.696Z",
                    updated_at: "2023-07-05T12:29:31.696Z",
                  },
                  {
                    id: 49,
                    user_id: 1,
                    atm_machine_id: 2,
                    transaction_type: "AWL",
                    amount: "74.0",
                    user_balance_left: "1439.0",
                    atm_balance_left: "14319.0",
                    created_at: "2023-07-05T12:29:31.702Z",
                    updated_at: "2023-07-05T12:29:31.702Z",
                  },
                  {
                    id: 50,
                    user_id: 1,
                    atm_machine_id: 1,
                    transaction_type: "NCD",
                    amount: "1.0",
                    user_balance_left: "1440.0",
                    atm_balance_left: "9938.0",
                    created_at: "2023-07-05T12:29:31.706Z",
                    updated_at: "2023-07-05T12:29:31.706Z",
                  },
                ]}
              />
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
