"use client";
import React, { useRef, useEffect } from "react";
import AWS from "aws-sdk";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { Box, Button, Center, Heading } from "@chakra-ui/react";

//Kelvin's credentials
AWS.config.update({
  accessKeyId: "AKIA6DSJFTLOIOEUJ37X",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

export default function page() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

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

    function startCapture() {
      intervalId = setInterval(captureFrame, 2000); // Capture every 1 second
    }

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

              // Pass the imageBuffer to indexFaces
              const img_name = "ryan";
              indexFaces(imageBuffer, img_name);
              console.log("Image Indexed : ", img_name);
            } catch (error) {
              console.error("Error converting Blob to Buffer:", error);
            }
          }
        }, "image/jpeg");
      }
    }

    getMediaStream();
    startCapture();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box>
      <Heading>Capture Frames</Heading>
      <video ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Center>
        <Button
          backgroundColor="red"
          onClick={() => router.push("/transactionHistory")}
        >
          Next
        </Button>
      </Center>
    </Box>
  );
}
