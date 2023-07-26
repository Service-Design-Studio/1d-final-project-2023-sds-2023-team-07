"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import {
  ChakraProvider,
  Button,
  PinInput,
  PinInputField,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const renderPage = () => {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Button
          onClick={recorderControls.startRecording}
          className="mt-6"
          colorScheme="red"
          size="md"
        >
          START RECORDING
        </Button>
        <Button
          onClick={recorderControls.stopRecording}
          className="mt-2"
          colorScheme="red"
          size="md"
        >
          STOP RECORDING
        </Button>
      </div>
    );
  };
  return <ChakraProvider>{renderPage()}</ChakraProvider>;
}
