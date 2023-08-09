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

  const [cansubmit, setCanSubmit] = React.useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [ic, setIc] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");

  const handleInputChange = (event, type) => {
    console.log(type);
    switch (type) {
      case "ic":
        setIc(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "pin":
        setPin(event.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    const pin1 =
      pinOne.current.value +
      pinTwo.current.value +
      pinThree.current.value +
      pinFour.current.value;
    try {
      // Fetch from the /api/users endpoint
      const response1 = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          identification_number: ic,
          balance: 0,
          pin: pin1,
          face_image_url: "http://example.com/face.jpg",
          is_active: 0,
        }),
      });

      const data1 = await response1.json();

      if (!response1.ok) {
        throw new Error(data1.message || "Failed to post data to /users");
      }

      console.log(data1);

      // If the above fetch was successful, proceed to the next fetch

      // Fetch from the /api/login endpoint
      const response2 = await fetch("/api/cookie/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identification_number: ic, // Note: This should probably be changed to the actual IC number you want to use
          pin: pin1, // Note: This should probably be changed to the actual PIN you want to use
        }),
      });

      const data2 = await response2.json();

      if (!response2.ok) {
        throw new Error(data2.message || "Failed to post data to /login");
      } else {
        console.log(data2);
        if (data2.logged_in) {
          router.push("/stream");
        }
      }

      console.log(data2);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPart = () => {
    switch (step) {
      case 1:
        return (
          <Input
            onChange={(e) => {
              handleInputChange(e, "name");
            }}
            focusBorderColor="red"
            placeholder="Name"
            size="lg"
            value={name}
          />
        );
      case 2:
        return (
          <Input
            onChange={(e) => {
              handleInputChange(e, "ic");
            }}
            focusBorderColor="red"
            placeholder="IC Number"
            size="lg"
            value={ic}
          />
        );
      case 3:
        return (
          <div className="flex justify-center items-center">
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
      <div className="flex h-screen flex-col justify-center items-center">
        <form
          onSubmit={(e) => {
            if (cansubmit) {
              handleSubmit();
            }
            e.preventDefault();
          }}
          className="flex justify-center flex-col w-5/6"
        >
          {renderPart()}

          {step === 3 ? (
            <Button
              key="submitButton"
              type="submit"
              className="grow mt-6"
              colorScheme="red"
              size="md"
              onClick={() => {
                setCanSubmit(true);
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              key="nextButton"
              onClick={() => {
                setStep(step + 1);
              }}
              className="grow mt-6"
              colorScheme="red"
              size="md"
              type="button"
            >
              Next
            </Button>
          )}
        </form>
      </div>
    </ChakraProvider>
  );
}
