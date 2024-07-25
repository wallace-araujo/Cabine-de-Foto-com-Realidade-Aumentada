import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import frame from "../assets/cartoon/frame.png";
const videoConstraints = {
  width: 480, //{ min: 480 },
  height: { min: 720 }, //  { min: 720 },
  facingMode: "environment", //user environment
  aspectRatio: 1
};

function CamShot({handlePage,setPhotoUser,characterSelected}) {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const videoRefIn = useRef(null);
  const videoRefOut = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inLoading, setInLoading] = useState(true);

  useEffect(() => {
    if (!imgSrc) return;

    handleSavePhoto()
  }, [imgSrc]);

  const handleSavePhoto = async() => {
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image();
    img.src = imgSrc;
    // console.log("imgSrc", imgSrc);
    img.onload = async () => {
      // console.log("imgSrc", img.width, img.height);
      // canvasRef.current.width = 480;
      // canvasRef.current.height = 780;
      canvasRef.current.width = 320;
      canvasRef.current.height = 500;
      // ctx.rotate(90 * (Math.PI / 180));
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("wallace", 10, 50);

      // ctx.drawImage(videoRefIn.current, 0, 0, 420, canvasRef.current.height);
      // ctx.drawImage(videoRefIn.current, 0, 0, 420, 720);
      ctx.drawImage(videoRefIn.current, 0, 0, 300, 480);
      ///////////////////FRame
      const additionalImageRef = new Image();
      additionalImageRef.src = frame;
      await additionalImageRef.decode();
      ctx.drawImage(additionalImageRef, 0, 0,  320, 500);
      ///////////////////
      

      const imgURL = canvasRef.current.toDataURL("image/jpeg");
      setPhotoUser(imgURL)

      ///

       setIsLoading(true)
       setInLoading(false)
      //const videoOut = videoRefOut.current;
       //console.log("videoOut",videoOut)
      // videoOut.play();
        
    };
  }


  const handleTakeScreenshot = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImgSrc(screenshot);
  };

  const handleVideoEnd = () => {
    // setIsPlaying(false);
    console.log("Video ended");
    handleTakeScreenshot();
  };

  const handleVideoOut = ()=>{
    handlePage("endUser")
  }

  return (
    <div className="webcam-container">
      <Webcam
        width={480}
        height={720}
        audio={false}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="webcam"
      />
       {inLoading && (
      <video
        onEnded={handleVideoEnd}
        ref={videoRefIn}
        width={400}
        height={300}
        src={characterSelected.takeIn}
        autoPlay
        className="video-in"
      />
      )}
      {isLoading && (
        <video
        autoPlay
          onEnded={handleVideoOut}
          ref={videoRefOut}
          width={400}
          height={300}
          src={characterSelected.takeOut}
          className="video-in"
        />
      )}

      <canvas ref={canvasRef} />
    </div>
  );
}

export { CamShot };
