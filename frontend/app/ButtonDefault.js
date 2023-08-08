"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";

export default function ButtonDefault({
  key,
  onClick,
  className,
  colorScheme,
  size,
  type,
  text,
}) {
  return (
    <ChakraProvider>
      <Button
        key={key}
        onClick={onClick}
        className={className}
        colorScheme={colorScheme}
        size={size}
        type={type}
      >
        {text}
      </Button>
    </ChakraProvider>
  );
}
