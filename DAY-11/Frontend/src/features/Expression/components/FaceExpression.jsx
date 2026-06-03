import { useEffect, useRef, useState } from "react";
import { startCamera, initModel, detectEmotion, detectLoop } from "../utils/utils";
import useSong from "../../Home/hooks/useSong";

const mapEmotionToMood = (emotion) => {
  if (emotion.toLowerCase().includes("happy")) return "happy";
  if (emotion.toLowerCase().includes("angry")) return "angry";
  if (emotion.toLowerCase().includes("sad")) return "sad";
  return "neutral";
};

const FaceExpression = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const { handleGetSong, loading, song, error } = useSong();
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      await startCamera({ videoRef });
      await initModel({ setFaceLandmarker });
    };
    init();
  }, []);

  const handleDetect = async () => {
    setStatusMessage("Detecting emotion...");
    await detectLoop({
      faceLandmarker,
      videoRef,
      setEmotion,
      onDetected: async (detectedEmotion) => {
        const mood = mapEmotionToMood(detectedEmotion);
        setStatusMessage(`Detected ${detectedEmotion}. Loading ${mood} song...`);
        const fetchedSong = await handleGetSong({ mood });
        if (fetchedSong) {
          setStatusMessage(`Playing ${fetchedSong.title} for ${mood}.`);
        } else {
          setStatusMessage(error || "No song found for this mood.");
        }
      },
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Emotion Detection</h2>

      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "10px" }}
        autoPlay
        muted
      />

      <h3>Emotion: {emotion}</h3>
      <button className="glow-btn" onClick={handleDetect} disabled={!faceLandmarker}>
        Detect Expression
      </button>

      <div style={{ marginTop: "16px" }}>
        <p>{statusMessage}</p>
        {loading && <p>Loading song...</p>}
        {song?.title && <p>Current track: {song.title}</p>}
      </div>
    </div>
  );
};

export default FaceExpression;