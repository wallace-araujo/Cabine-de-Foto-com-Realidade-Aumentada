import React from "react";
import bgKids from "../assets/cartoon/BG kids2.jpg";
import homeKIDS from "../assets/cartoon/Home_KIDS.png";
import { QRCodeCanvas } from "qrcode.react";
import loading from "../assets/cartoon/coundown_line.webm";
function FinalPage({ handlePage, urlPhoto, inLoading }) {
  return (
    <div>
      <img
        src={bgKids}
        alt="bgKids"
        style={{ width: "100%", height: "100%" }}
      />
      {inLoading && (
        <video
          width={400}
          height={300}
          src={loading}
          autoPlay
          className="video-loading"
        />
      )}

      {!inLoading && (
        <>
          <img
            src={urlPhoto}
            alt="photoUser"
            style={{
              width: "60%",
              height: "52%",
              display: "block",
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
          <QRCodeCanvas
            value={urlPhoto}
            style={{
              height: "20%",
              width: "35%",
              display: "block",
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        </>
      )}

      <img
        src={homeKIDS}
        alt="homeKIDS"
        style={{
          position: "absolute",
          top: "85%",
          left: "10%",
          width: "20%"
        }}
        onClick={() => handlePage("home")}
      />
    </div>
  );
}

export { FinalPage };
