import React from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";

export default function Pin() {
  return (
    <div className="flex h-screen items-center justify-center">
      <PinInput size="lg">
        <PinInputField className="mr-2 mt-6:hover" />
        <PinInputField className="mr-2" />
        <PinInputField className="mr-2" />
        <PinInputField className="mr-2" />
      </PinInput>
    </div>
  );
}
