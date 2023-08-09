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

export default function Page() {
  const router = useRouter();
  const [ps, setPs] = useState("ic");
  const [ic, setIc] = useState("");
  const [pin, setPin] = useState("");
  const pinOne = useRef(null);
  const pinTwo = useRef(null);
  const pinThree = useRef(null);
  const pinFour = useRef(null);

  async function login() {
    const pin1 =
      pinOne.current.value +
      pinTwo.current.value +
      pinThree.current.value +
      pinFour.current.value;
    console.log(typeof pin1);
    console.log(pin1);
    console.log(typeof ic);
    console.log(ic);
    fetch("/api/cookie/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // identification_number: "ABC123",
        // pin: "1234",
        identification_number: ic,
        pin: pin1,
      }),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the result from your login endpoint
        // For example, if there's an error or if the user was successfully logged in.
        console.log(result);
        if (result.logged_in) {
          console.log(result);
          router.push("/");
        }
        if (!result.ok) {
          throw new Error(result.message || "Failed to post data to /login");
        }
      })
      .catch((error) => {
        // Handle errors from the fetch or the endpoint
        console.error("Failed to login:", error);
      });
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
