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
  const router = useRouter();

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const postData = async (formData) => {
    try {
      const response = await axios.post(
        "https://localhost:8080/voice",
        { formData },
        {
          timeout: 120000, // 120 seconds (in milliseconds)
        }
      );

      // handle the response
      console.log(response.data);
    } catch (error) {
      // handle the error
      console.error(error);
    }
  };

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    console.log(recordingBlob);
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  const addAudioElement = (blob) => {
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audio.classList.add("hidden");
    document.body.appendChild(audio);

    const formData = new FormData();
    formData.append("audio-file", blob);
    // formData.append("user_language", "English");

    // Get value from kelvins script and conditionally route to specific page
    const paramValue = "example";
    const pageState = "deposit";
    router.push(`/account?pageState=${pageState}`);

    // return postData(formData);
  };

  const renderPage = () => {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="my-2 text-gray-800 font-bold text-2xl">
          CLICK THE RECORD BUTTON
        </h1>
        <h1 className="my-2 text-gray-800 text-2xl">TRY SAYING DEPOSIT</h1>
        <AudioRecorder
          className="hidden"
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          // downloadOnSavePress={true}
          downloadFileExtension="mp3"
          showVisualizer={true}
        />
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
