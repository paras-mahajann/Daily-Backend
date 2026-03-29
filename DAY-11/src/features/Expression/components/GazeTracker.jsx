import React, { useRef, useEffect, useState } from "react";

const GazeTracker = () => {
  const videoRef = useRef(null);

  const [cursor, setCursor] = useState({ x: 300, y: 300 });

  let prevX = 300;
  let prevY = 300;

  useEffect(() => {
    if (!videoRef.current || !window.FaceMesh || !window.Camera) return;

    const faceMesh = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }, []);

  const smooth = (prev, current) => prev * 0.5 + current * 0.5  ;

  const onResults = (results) => {
    if (
      !results.multiFaceLandmarks ||
      results.multiFaceLandmarks.length === 0
    ) {
      return;
    }

    const landmarks = results.multiFaceLandmarks[0];

    const left = landmarks[35];
    const right = landmarks[133];
    const iris = landmarks[468];

    const eyeWidth = right.x - left.x;
    const gazeXRatio = (iris.x - left.x) / eyeWidth;

    const top = landmarks[159];
    const bottom = landmarks[120];
    const eyeHeight = bottom.y - top.y;
    const gazeYRatio = 1.2*((iris.y - top.y) / eyeHeight);


    let screenX = (1 - gazeXRatio) * window.innerWidth;
    let screenY = (1 - gazeYRatio) * window.innerHeight;

    screenX = smooth(prevX, screenX);
    screenY = smooth(prevY, screenY);

    prevX = screenX;
    prevY = screenY;
    console.log(prevX, prevY);

    setCursor({ x: screenX, y: screenY });
  };

  return (
    <div>
      <video
        ref={videoRef}
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          width: 200,
          borderRadius: "10px",
        }}
        autoPlay
        playsInline
      />

      <div
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          width: "20px",
          height: "20px",
          background: "red",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "0.05s linear",
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default GazeTracker;