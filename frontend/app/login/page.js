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
  const [error, setError] = useState(false);

  async function login() {
    console.log("calling login");
    const pin1 =
      pinOne.current.value +
      pinTwo.current.value +
      pinThree.current.value +
      pinFour.current.value;
    fetch("/api/cookie/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identification_number: ic,
        pin: pin1,
      }),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Handle the result from your login endpoint
        // For example, if there's an error or if the user was successfully logged in.
        if (result.logged_in) {
          localStorage.setItem("id", ic);
          console.log("logging in");
          router.push("/transactionHistory");
        } else if (!result.logged_in) {
        }
        if (
          result.message == "Unexpected end of JSON input" ||
          result.logged_in == false
        ) {
          setError(true);
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
          <div className="flex flex-col justify-center items-center">
            <Input
              onChange={(e) => {
                handleInputChange(e);
              }}
              focusBorderColor="red"
              placeholder="Enter Your IC"
              size="lg"
              value={ic}
            />
            <Button
              key="nextButton"
              className="mt-6 grow w-full p-6"
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
          <div className="flex flex-col justify-center items-center">
            <h1 className="my-2 text-gray-800 font-bold text-2xl mb-6">
              Key in your pin here
            </h1>
            <div>
              <PinInput size="lg" className="flex justify-center items-center">
                <PinInputField className="mr-2 mt-6:focus" ref={pinOne} />
                <PinInputField className="mr-2" ref={pinTwo} />
                <PinInputField className="mr-2" ref={pinThree} />
                <PinInputField className="mr-2" ref={pinFour} />
              </PinInput>
            </div>
            {error ? (
              <p className="mt-6 text-center text-red-800">Incorrect Pin</p>
            ) : (
              <div></div>
            )}

            <Button
              className="mt-6 ml-3 mr-3 p-6 w-full"
              onClick={() => {
                login();
              }}
              colorScheme="red"
              size="md"
            >
              SUBMIT
            </Button>
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}
