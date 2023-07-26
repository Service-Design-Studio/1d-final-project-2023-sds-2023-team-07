"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
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
  const [audioBlob, setAudioBlob] = useState(null);
  const router = useRouter();

  const convertWebmToMp3 = async (webmBlob) => {
    // Create an instance of FFmpeg
    const ffmpeg = createFFmpeg({ log: true });

    // Load the FFmpeg library
    await ffmpeg.load();

    // Write the input webm blob to a file
    ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmBlob));

    // Run the FFmpeg command to convert webm to mp3
    await ffmpeg.run("-i", "input.webm", "output.mp3");

    // Read the output mp3 file as a Blob
    const outputData = ffmpeg.FS("readFile", "output.mp3");
    const mp3Blob = new Blob([outputData.buffer], { type: "audio/mpeg" });

    // Cleanup temporary files
    ffmpeg.FS("unlink", "input.webm");
    ffmpeg.FS("unlink", "output.mp3");

    return mp3Blob;
  };

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const handleConversion = async () => {
    const webmBlob = audioBlob; // Your existing webm audio blob
    try {
      const mp3Blob = await convertWebmToMp3(webmBlob);
      // Use the mp3Blob as needed
      console.log(mp3Blob);
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  };

  const postData = async (formData) => {
    try {
      // Create form data and append the webm blob

      // Send the webm blob data to the Flask API
      fetch(
        "https://ml-deployment-v5-ml42q3c3ya-as.a.run.app/voice?user_codec=webm",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Webm blob sent successfully");
            // Do something on success
          } else {
            console.error("Failed to send Webm blob");
            // Handle error case
            console.log(response);
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while sending Webm blob:",
            error.response
          );
          // Handle error case
        });
    } catch (error) {
      console.error("Sending Webm blob failed:", error);
    }
  };

  const addAudioElement = (blob) => {
    console.log(blob);
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audio.classList.add("hidden");
    document.body.appendChild(audio);

    const formData = new FormData();
    formData.append("stream_obj", blob);
    formData.append("user_codec", "webm");
    // formData.append("user_language", "English");

    // Get value from kelvins script and conditionally route to specific page
    // const paramValue = "example";
    // const pageState = "select";
    // router.push(`/account?pageState=${pageState}`);

    return postData(formData);
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
          onRecordingComplete={(blob) => {
            addAudioElement(blob);
            // handleConversion();
          }}
          recorderControls={recorderControls}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
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
