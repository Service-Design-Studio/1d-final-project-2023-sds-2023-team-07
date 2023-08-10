import React from "react";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Base() {
  const router = useRouter();
  return (
    <div className="flex justify-center context-center h-screen">
      <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto px-10">
        <div className="text-center"> 
          <img src="https://storage.googleapis.com/backend-dbs-grp7/logo.jpg" alt="Logo" />
        </div>
        <Button
          id="refreshButton"
          onClick={() => {
            router.push("/signup");
          }}
          className="mt-6 py-10 px-10 rounded-full"
          colorScheme="red"
          size="lg"
          width="200px" // Set the desired width here
          height="48px"
          fontSize="1.5em"
        >
          SIGNUP
        </Button>
        <Button
          id="refreshButton"
          onClick={() => {
            router.push("/login");
          }}
          className="mt-6 py-10 px-20 rounded-full"
          colorScheme="red"
          size="lg"
          width="200px" // Set the desired width here
          height="48px"
          fontSize="1.5em"
        >
          LOGIN
        </Button>
        
      </div>
    </div>
  );
}
