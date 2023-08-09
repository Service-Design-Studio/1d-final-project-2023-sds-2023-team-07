import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import jsQR from "jsqr";
import { useRouter } from "next/router";
import Ajv from "ajv";

const QrCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [qrCodeResult, setQrCodeResult] = useState<any>(null);

  const router = useRouter();

  // JSON schema for TransactionData
  const transactionDataSchema = {
    type: "object",
    properties: {
      user_id: { type: "number" },
      atm_machine_id: { type: "number" },
      amount: { type: ["number", "null"] },
      transaction_type: { type: "string" },
      identification_number: { type: "string" },
      pin: { type: "string" },
    },
    required: ["amount", "transaction_type", "identification_number", "pin"],
    additionalProperties: false,
  };

  const ajv = new Ajv();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!qrCodeResult) {
        router.push("/status/TimeoutFail");
      }
    }, 20000);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const video = videoRef.current;
        video!.srcObject = stream;
        video!.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video!.play();
        requestAnimationFrame(tick);
      });

    const tick = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const canvas = canvasRef.current!;
        const video = videoRef.current!;
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          console.log("Found QR code", code.data);
          try {
            const result = JSON.parse(code.data);

            // Validate QR code data
            if (!ajv.validate(transactionDataSchema, result)) {
              console.error("Invalid QR code:", ajv.errors);
              router.push("/status/QrFail");
              return;
            }

            setQrCodeResult(result);
            clearTimeout(timer);
            router.push({
              pathname: "/status/Transaction",
              query: { data: JSON.stringify(result) },
            });
          } catch (error) {
            console.error("Error parsing QR code:", error);
            router.push("/status/QrFail");
          }
        }
      }

      requestAnimationFrame(tick);
    };

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  return (
    <Box>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "white",
          display: qrCodeResult ? "none" : "block",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
        }}
      />
    </Box>
  );
};

export default QrCodeScanner;
