"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import axios from "axios";

export default function Page() {
  return (
    <ChakraProvider>
      <div className="h-100 w-100 flex justify-center context-center flex-col">
        <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
              <div class="absolute">
                <div class="flex flex-col content-center">
                  <h1 class="my-2 text-gray-800 font-bold text-2xl">
                    Looks like you've found the doorway to the great nothing
                  </h1>
                  <p class="my-2 text-gray-800">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                  </p>
                  <Button
                    colorScheme="red"
                    class=" lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                  >
                    Take me there!
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
    </ChakraProvider>
  );
}
