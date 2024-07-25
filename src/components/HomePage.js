import React, { useRef, useEffect } from "react";
import leaves from "../assets/cartoon/leaves.webm";
import bgKids from "../assets/cartoon/BG kids2.jpg";
import takePhoto from "../assets/cartoon/let's take a photo-PT.png";
import StartKids from "../assets/cartoon/Start_KIDS.png";



function HomePage({handlePage}) {
  
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        video.play();
      }, []);

      
  return (
    <div>
    <img
      src={bgKids}
      alt="bgKids"
      style={{ width: "100%", height: "100%" }}
    />
    <img
      src={takePhoto}
      alt="takePhoto"
      style={{
        width: "60%",
        display:"block",
        position: "absolute",
        top: "20%",
        left: "50%",
        transform:"translate(-50%, -50%)"
      }}
    />

    <video
      ref={videoRef}
      src={leaves}
      autoPlay
      muted
      loop
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        objectFit:"cover"
      }}
    />
    <img
      src={StartKids}
      alt="StartKids"
      style={{
        width: "45%",
        position: "absolute",
        zIndex: 1,
        top: "55%",
        left: "30%"
      }}
      onClick={()=>handlePage('menu')}
    />
  </div>
  );
}

export { HomePage };