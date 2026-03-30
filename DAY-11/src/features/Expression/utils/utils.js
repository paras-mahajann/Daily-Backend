import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


// Initialize Camera
  export const startCamera = async ({videoRef}) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  };

  // Initialize MediaPipe
  export const initModel = async ({setFaceLandmarker}) => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    setFaceLandmarker(landmarker);
  };


  // Emotion Logic
  export const detectEmotion = (blendshapes) => {
    let smileLeft = 0,
      smileRight = 0,
      browDownLeft = 0,
      browDownRight = 0,
      mouthFrownLeft = 0,
      mouthFrownRight = 0;

    blendshapes.forEach((shape) => {
      const name = shape.categoryName;
      const score = shape.score;

      if (name === "mouthSmileLeft") smileLeft = score;
      if (name === "mouthSmileRight") smileRight = score;
      if (name === "browDownLeft") browDownLeft = score;
      if (name === "browDownRight") browDownRight = score;
      if (name === "mouthFrownLeft") mouthFrownLeft = score;
      if (name === "mouthFrownRight") mouthFrownRight = score;
    });

    if (smileLeft > 0.5 && smileRight > 0.5) return "😊 Happy";
    if (browDownLeft > 0.3 && browDownRight > 0.3) return "😠 Angry";    
    if (mouthFrownLeft > 0.04 || mouthFrownRight > 0.04) return "😢 Sad";


    return "😐 Neutral";
  };

  // Detection Loop
  export const detectLoop = async ({faceLandmarker,videoRef,setEmotion}) => {
    if (!faceLandmarker || !videoRef.current) return;

    const results = faceLandmarker.detectForVideo(
      videoRef.current,
      performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      const detectedEmotion = detectEmotion(blendshapes);
      setEmotion(detectedEmotion);
      return;
    }

    requestAnimationFrame(detectLoop);
  };