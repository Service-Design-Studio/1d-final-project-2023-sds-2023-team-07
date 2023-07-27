"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <div className="h-100 w-100 flex justify-center context-center flex-col">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="flex flex-col content-center">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Sorry, something when wrong with our ATM, please try again
                  later!
                </h1>
                <Button
                  id="refreshButton"
                  onClick={() => {
                    router.push("/");
                  }}
                  className="mt-6"
                  colorScheme="red"
                  size="md"
                >
                  BACK TO HOMEPAGE
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    </div>
  );
}
