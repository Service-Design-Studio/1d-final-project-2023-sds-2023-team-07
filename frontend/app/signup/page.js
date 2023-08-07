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
    try {
      //   fetch("https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: name,
      //       identification_number: ic,
      //       balance: 0,
      //       pin: pin,
      //       face_image_url: "http://example.com/face.jpg",
      //       is_active: 0,
      //     }),
      //   }).then(
      //     await fetch("https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/login", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         identification_number: "ABC123",
      //         pin: "1234",
      //       }),
      //     })
      //   );

      fetch("https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          identification_number: ic,
          balance: 0,
          pin: pin,
          face_image_url: "http://example.com/face.jpg",
          is_active: 0,
        }),
      })
        .then((response) => response.json()) // Convert the response to JSON
        .then((data1) => {
          console.log(data1); // Data from first request

          // Make the second POST request
          return fetch(
            "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identification_number: "ABC123",
                pin: "1234",
              }),
              credentials: "include",
            }
          );
        })
        .then((response) => response.json()) // Convert the second response to JSON
        .then((data2) => {
          console.log(data2); // Data from second request
        })
        .catch((error) => console.error("Error:", error));
      if (response.ok) {
        console.log("Data posted successfully");
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("x");
    router.push("/stream");
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
