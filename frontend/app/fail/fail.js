"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Fail() {
  return (
    <div className="flex flex-col content-center">
      <h1 className="my-2 text-gray-800 font-bold text-2xl">
        Sorry, something when wrong with our ATM, please try again later!
      </h1>
      <Button
        id="refreshButton"
        onClick={() => {
          router.push("/transactionHistory");
        }}
        className="mt-6"
        colorScheme="red"
        size="md"
      >
        BACK TO HOMEPAGE
      </Button>
    </div>
  );
}
