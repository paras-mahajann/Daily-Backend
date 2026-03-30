import { useEffect, useRef, useState } from "react";
import { startCamera,initModel, detectEmotion,detectLoop} from "../utils/utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const [faceLandmarker, setFaceLandmarker] = useState(null);


  useEffect(() => {
    const init = async () => {
      await startCamera({videoRef});
      await initModel({setFaceLandmarker});
    };
    init();
  }, []);

 

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
      <button className="glow-btn" onClick={()=>{detectLoop({faceLandmarker,videoRef,setEmotion})}}>Detect Expression</button>
    </div>
  );
};

export default FaceExpression;