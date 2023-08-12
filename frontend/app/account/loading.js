"use client"; // This is a client component 👈🏽import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
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
  );
}
