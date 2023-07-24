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
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    const formData = new FormData();
    formData.append("audio-file", blob);
    return fetch("http://localhost:3000/audioUpload", {
      method: "POST",
      body: formData,
    }).then((output) => {
      // take out put and display onscreen
      console.log(output);
    });
  };

  const renderPage = () => {
    return (
      <div>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          // downloadOnSavePress={true}
          // downloadFileExtension="mp3"
          showVisualizer={true}
        />
        <Button
          onClick={recorderControls.startRecording}
          className="grow"
          colorScheme="red"
          size="md"
        >
          START
        </Button>
        <Button
          onClick={recorderControls.stopRecording}
          className="grow"
          colorScheme="red"
          size="md"
        >
          STOP
        </Button>
      </div>
    );
  };
  return <ChakraProvider>{renderPage()}</ChakraProvider>;
}
