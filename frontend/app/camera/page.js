"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChakraProvider,
  Button,
  PinInput,
  PinInputField,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Error from "../Error";
import Pin from "./Pin";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [counter, setCounter] = useState(1);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [pageState, setPageState] = useState("main");
  const [display, setDisplay] = useState(false);
  const [authFail, setAuthFail] = useState(false);

  const isMobile = () => {
    // This is a simple way to detect mobile devices based on userAgent.
    // It's not foolproof, but it works for most popular devices.
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const getVideo = () => {
    let constraints;

    if (isMobile()) {
      constraints = {
        video: {
          facingMode: "environment", // This will target the front camera on mobile devices
          aspectRatio: { ideal: 1.7777777778 }, // 16:9 aspect ratio
        },
      };
    } else {
      constraints = {
        video: {
          width: 2000,
          height: 1000,
        },
      };
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const extractQueryString = (urlString) => {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const keyValuePairs = {};

    for (const [key, value] of params.entries()) {
      keyValuePairs[key] = value;
    }

    return keyValuePairs;
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

    console.log(ctx);
    let newPhoto = photoRef.current;
    var dataURL = newPhoto.toDataURL("image/jpeg");
    let id = localStorage.getItem("id");
    axios
      .post(
        "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/face",
        {
          image: dataURL,
          identification_number: id,
        },
        config
      )
      .then((response) => {
        console.log(response.data.authenticated);

        // SUCCESS LOGIC AND ROUTING
        if (response.data.authenticated) {
          console.log("success");
          const params = extractQueryString(window.location.href);
          console.log(params);
          if (params["ic"]) {
            router.push("/transactionhistory");
          }
          router.push(`/account?pageState=${params.pageState}`);
          // IF FAIL 3 TIMES REDIRECT TO PIN
        } else if (!response.data.authenticated && counter == 3) {
          console.log("fail counter: " + counter);
          setPageState("pin");
          // IF FAIL LESS THAN 3 TIMES ADD TO INTEGER
        } else {
          console.log("fail counter: " + counter);
          setAuthFail(true);
          setCounter(counter + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get video on component init
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  setTimeout(() => {
    setDisplay(true);
  }, 3000);

  // post data to backend on hasPhoto boolean true
  useEffect(() => {
    const params = extractQueryString(window.location.href);

    console.log(params);
  }, []);

  const renderPage = () => {
    switch (pageState) {
      case "main":
        return (
          <div className="flex h-screen flex-col items-center justify-center">
            <div
              className={
                display
                  ? "flex flex-col items-center hidden invisible"
                  : "flex flex-col items-center"
              }
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red"
                size="xl"
              />
              <p className="my-2 mt-4 text-gray-800">Loading...</p>
            </div>
            <div
              className={
                display
                  ? "flex justify-center context-center flex-col"
                  : "flex justify-center context-center flex-col hidden invisible"
              }
            >
              <video className="h-80 w-80 m-auto" ref={videoRef}></video>
              <Button
                onClick={() => {
                  takePhoto();
                }}
                className="grow ml-3 mr-3"
                colorScheme="red"
                size="md"
              >
                AUTH NOW
              </Button>
              {authFail ? (
                <p className="mt-6 text-center text-red-800">
                  Authentication failed, incorrect user!
                </p>
              ) : (
                <div></div>
              )}
            </div>
            <div className="invisible hidden">
              <canvas className="invisible hidden" ref={photoRef}></canvas>
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
      case "pin":
        return <Pin />;
        break;
      default:
        return null;
        break;
    }
  };
  return <ChakraProvider>{renderPage()}</ChakraProvider>;
}
