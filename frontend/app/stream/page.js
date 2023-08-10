"use client";
import React, { useRef, useEffect } from "react";
import {
  ChakraProvider,
  Input,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import AWS from "aws-sdk";
import { useRouter } from "next/navigation"; // 1. Import useRouter

//Kelvin's credentials
AWS.config.update({
  accessKeyId: "AKIA6DSJFTLOIOEUJ37X",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

export default function Page() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  const startCapture = () => {
    intervalId = setInterval(captureFrame, 500);
    console.log("capturing");
  };

  async function indexFaces(photo_jpg, personName) {
    const client = new AWS.Rekognition();
    const imageBytes = photo_jpg; //assuming that u pass in a photo_jpg blob

    try {
      const response = await client
        .indexFaces({
          CollectionId: "face-id-test", // this is the correct collection ID
          ExternalImageId: personName,
          Image: {
            Bytes: imageBytes,
          },
          MaxFaces: 1,
        })
        .promise();

      // Return the face records from the response
      return response.FaceRecords;
    } catch (error) {
      console.error("Error indexing faces:", error);
      return [];
    }
  }

  async function captureFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas content to JPEG blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Convert Blob to ArrayBuffer
            const arrayBuffer = await blob.arrayBuffer();
            // Create a Buffer from the ArrayBuffer
            const imageBuffer = Buffer.from(arrayBuffer);
            let value = localStorage.getItem("id");

            // Pass the imageBuffer to indexFaces
            const img_name = value;
            indexFaces(imageBuffer, img_name);
            console.log("Image Indexed : ", img_name);
          } catch (error) {
            console.error("Error converting Blob to Buffer:", error);
          }
        }
      }, "image/jpeg");
    }
  }

  useEffect(() => {
    let intervalId;

    async function getMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    getMediaStream();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ChakraProvider>
      <div>
        <div className={"flex justify-center context-center flex-col"}>
          <video
            className="h-80 w-80 m-auto"
            ref={videoRef}
            autoPlay
            playsInline
            muted
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <Button
            onClick={startCapture}
            className="grow ml-3 mr-3"
            colorScheme="red"
            size="md"
          >
            START
          </Button>
          <Button
            onClick={() => {
              router.push("/transactionHistory");
            }}
            className="grow ml-3 mr-3"
            colorScheme="red"
            size="md"
          >
            NEXT
          </Button>
        </div>
      </div>
    </ChakraProvider>
  );
}
