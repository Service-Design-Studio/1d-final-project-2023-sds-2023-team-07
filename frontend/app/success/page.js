"use client"; // This is a client component 👈🏽import React from "react";
import {
  Button,
  PinInput,
  PinInputField,
  ChakraProvider,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <ChakraProvider>
      <div className="flex justify-center context-center h-screen">
        <div className="h-100 w-100 flex justify-center context-center flex-col">
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div class="text-center">
            <h1 className="my-2 text-gray-800 font-bold text-2xl">Success!</h1>

            <Button
              onClick={() => {
                router.push("/");
              }}
              colorScheme="red"
              className=" lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
            >
              BACK TO MAIN PAGE
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
