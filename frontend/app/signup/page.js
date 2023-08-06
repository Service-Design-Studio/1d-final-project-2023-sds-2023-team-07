"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PhoneIcon,
  CheckIcon,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const pinOne = useRef(null);
  const pinTwo = useRef(null);
  const pinThree = useRef(null);
  const pinFour = useRef(null);

  const [step, setStep] = useState(1);
  const [ic, setIc] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");

  const handleInputChange = (event, type) => {
    console.log(event);
    console.log(type);
    switch (type) {
      case "ic":
        setIc(event.target.value);
        break;
      case "name":
        setIc(event.target.value);
        break;
      case "pin":
        setIc(event.target.value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await fetch("https://api.example.com/post-endpoint", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ data: inputValue }),
    //   });

    //   if (response.ok) {
    //     console.log("Data posted successfully");
    //   } else {
    //     console.error("Failed to post data");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    router.push("/stream");
  };

  const renderPart = () => {
    switch (step) {
      case 1:
        return (
          <Input
            onChange={(e) => {
              handleInputChange(e, "ic");
            }}
            focusBorderColor="pink.400"
            placeholder="IC Number"
            size="lg"
          />
        );
      case 2:
        return (
          <Input
            onChange={(e) => {
              handleInputChange(e, "ic");
            }}
            focusBorderColor="pink.400"
            placeholder="Name"
            size="lg"
          />
        );
      case 3:
        return (
          <div>
            <PinInput size="lg">
              <PinInputField className="mr-2 mt-6:focus" ref={pinOne} />
              <PinInputField className="mr-2" ref={pinTwo} />
              <PinInputField className="mr-2" ref={pinThree} />
              <PinInputField className="mr-2" ref={pinFour} />
            </PinInput>
          </div>
        );
    }
  };
  return (
    <ChakraProvider>
      <div>
        <form onSubmit={handleSubmit}>
          {renderPart()}

          {step === 3 ? (
            <Button type="submit" className="grow" colorScheme="red" size="md">
              Submit
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                setStep(step + 1);
              }}
              className="grow"
              colorScheme="red"
              size="md"
            >
              Next
            </Button>
          )}
        </form>
      </div>
    </ChakraProvider>
  );
}
