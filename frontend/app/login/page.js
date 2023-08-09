"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Input,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [ps, setPs] = useState("ic");
  const [ic, setIc] = useState("");
  const [pin, setPin] = useState();
  const pinOne = useRef(null);
  const pinTwo = useRef(null);
  const pinThree = useRef(null);
  const pinFour = useRef(null);

  async function login() {
    setPin(
      pinOne.current.value +
        pinTwo.current.value +
        pinThree.current.value +
        pinFour.current.value
    );
    const response2 = await fetch("/api/cookie/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identification_number: ic, // Note: This should probably be changed to the actual IC number you want to use
        pin: pin, // Note: This should probably be changed to the actual PIN you want to use
      }),
    });

    const data2 = await response2.json();
    if (!response2.ok) {
      throw new Error(data2.message || "Failed to post data to /login");
    } else {
      console.log("success");
    }
  }

  const handleInputChange = (event) => {
    setIc(event.target.value);
  };

  return (
    <ChakraProvider>
      <div className="flex h-screen flex-col justify-center items-center">
        {ps == "ic" ? (
          <div>
            <Input
              onChange={(e) => {
                handleInputChange(e);
              }}
              focusBorderColor="red"
              placeholder="IC"
              size="lg"
              value={ic}
            />
            <Button
              key="nextButton"
              className="mt-6"
              colorScheme="red"
              size="md"
              type="button"
              onClick={() => {
                setPs("pin");
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div>
            <PinInput size="lg">
              <PinInputField className="mr-2 mt-6:focus" ref={pinOne} />
              <PinInputField className="mr-2" ref={pinTwo} />
              <PinInputField className="mr-2" ref={pinThree} />
              <PinInputField className="mr-2" ref={pinFour} />
            </PinInput>
            <Button
              className="mt-6 ml-3 mr-3"
              onClick={() => {
                login();
              }}
              colorScheme="red"
              size="md"
            >
              AUTH NOW
            </Button>
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}
