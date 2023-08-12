"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import axios from "axios";
import Error from "./error";

export default function Page() {
  return (
    <ChakraProvider>
      <div className="h-100 w-100 flex justify-center context-center flex-col">
        <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
              <div class="absolute">
                <Error />
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
