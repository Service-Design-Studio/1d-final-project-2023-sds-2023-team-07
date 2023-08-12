"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";

export default function Error() {
  return (
    <div class="flex flex-col content-center">
      <h1 class="my-2 text-gray-800 font-bold text-2xl">
        Looks like you've found the doorway to the great nothing
      </h1>
      <p class="my-2 text-gray-800">
        Sorry about that! Please visit our hompage to get where you need to go.
      </p>
      <Button
        colorScheme="red"
        class=" lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
      >
        Take me there!
      </Button>
    </div>
  );
}
