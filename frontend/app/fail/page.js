"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Fail from "./fail";

export default function Error() {
  const router = useRouter();
  return (
    <div className="h-100 w-100 flex justify-center context-center flex-col">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <Fail />
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
