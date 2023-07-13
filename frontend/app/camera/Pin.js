import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, PinInput, PinInputField } from "@chakra-ui/react";
import axios from "axios";

export default function Pin() {
  const pinOne = useRef(null);
  const pinTwo = useRef(null);
  const pinThree = useRef(null);
  const pinFour = useRef(null);
  const [error, setError] = useState(false);
  const [incorrectPin, setIncorrectPin] = useState(false);
  const router = useRouter();

  const submit = () => {
    const stringPayload =
      pinOne.current.value +
      pinTwo.current.value +
      pinThree.current.value +
      pinFour.current.value;

    console.log(stringPayload.length);
    if (stringPayload.length === 4) {
      // post through axios
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/pin",
          {
            pin: stringPayload,
            name: "Kelvin",
          },
          config
        )
        .then((response) => {
          console.log(response.data.authenticated);
          if (response.data.authenticated) {
            router.push("/success");
          } else if (!response.data.authenticated) {
            setError(false);
            setIncorrectPin(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // redirect to sucess page
    } else {
      setIncorrectPin(false);
      setError(true);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="my-2 text-gray-800 font-bold text-2xl">
        Face Authentication Failed
      </h1>
      <p className="mt-2 mb-6 text-gray-800">Reverting to PIN</p>
      <div>
        <PinInput size="lg">
          <PinInputField className="mr-2 mt-6:focus" ref={pinOne} />
          <PinInputField className="mr-2" ref={pinTwo} />
          <PinInputField className="mr-2" ref={pinThree} />
          <PinInputField className="mr-2" ref={pinFour} />
        </PinInput>
      </div>
      <Button
        className="mt-6 ml-3 mr-3"
        onClick={() => {
          submit();
        }}
        colorScheme="red"
        size="md"
      >
        AUTH NOW
      </Button>
      {!error ? (
        <div></div>
      ) : (
        <p className="mt-2 mb-6 text-red-800">Please fill up all pins</p>
      )}
      {incorrectPin ? (
        <p className="mt-2 mb-6 text-red-800">IncorrectPin</p>
      ) : (
        <div></div>
      )}
    </div>
  );
}
