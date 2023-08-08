"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function page({
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
