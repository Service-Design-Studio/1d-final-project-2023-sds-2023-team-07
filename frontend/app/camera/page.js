"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import axios from "axios";
import Error from "../Error";

export default function Home() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [pageState, setPageState] = useState("loading");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 2000,
          height: 1000,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  // get video on component init
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // post data to backend on hasPhoto boolean true
  useEffect(() => {
    let ctx = photoRef.current;
    var dataURL = ctx.toDataURL("image/jpeg");

    console.log(dataURL);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "/api/upload",
        {
          data: dataURL,
          name: "Kelvin",
        },
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hasPhoto]);

  const renderPage = () => {
    switch (pageState) {
      case "loading":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red"
                size="xl"
              />
              <p className="my-2 mt-4 text-gray-800">Loading...</p>
            </div>
          </div>
        );
        break;
      case "main":
        return (
          <div className="h-100 w-100 flex justify-center context-center flex-col">
            <div className="flex justify-center context-center flex-col">
              <video className="h-80 w-80 m-auto" ref={videoRef}></video>
              <Button
                onClick={takePhoto}
                className="grow ml-3 mr-3"
                colorScheme="red"
                size="md"
              >
                AUTH NOW
              </Button>
            </div>
            <div classname="invisible hidden">
              <canvas ref={photoRef}></canvas>
            </div>
          </div>
        );

        break;
      case "error":
        return (
          <Error
            errorMsg={"Sorry our services seem to be down at the moment :("}
            subText={"Try again in around 30 mins!"}
          />
        );
        break;
      default:
        return null;
        break;
    }
  };
  return <ChakraProvider></ChakraProvider>;
}
