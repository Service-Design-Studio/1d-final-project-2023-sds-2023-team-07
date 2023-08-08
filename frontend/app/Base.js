import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Base() {
  const router = useRouter();
  return (
    <div className="flex justify-center context-center h-screen">
      <div className="flex flex-col justify-center context-center">
        <Button
          id="refreshButton"
          onClick={() => {
            router.push("/signup");
          }}
          className="mt-6"
          colorScheme="red"
          size="lg"
        >
          SIGNUP
        </Button>
        <Button
          id="refreshButton"
          onClick={() => {
            router.push("/login");
          }}
          className="mt-6"
          colorScheme="red"
          size="lg"
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
}
