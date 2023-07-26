import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QrCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [qrCodeResult, setQrCodeResult] = useState<any>(null);

  useEffect(() => {
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
      if (videoRef.current!.readyState === videoRef.current!.HAVE_ENOUGH_DATA) {
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
            setQrCodeResult(result);
            console.log(result);
          } catch (error) {
            console.error("Error parsing QR code:", error);
          }
        }
      }

      requestAnimationFrame(tick);
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "300px", backgroundColor: "white" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <p>
        <pre>{JSON.stringify(qrCodeResult, null, 2)}</pre>
      </p>
    </div>
  );
};

export default QrCodeScanner;
