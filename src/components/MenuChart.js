import React, { useState, useRef, useEffect } from "react";
import bgKids from "../assets/cartoon/BG kids2.jpg";
import choose from "../assets/cartoon/Choose_Text_KIDS-2.png";
import takePhoto from "../assets/cartoon/take_photo_KIDS2.png";
import foxSelected from "../assets/cartoon/Character_fox_Selected-2.png";
import foxUnSelected from "../assets/cartoon/Character_fox_UNselected2.png";
import foxSideOUT from "../assets/cartoon/Fox side OUT.webm";
import foxCamIn from "../assets/cartoon/Fox IN + countdown.webm";
import foxCamOut from "../assets/cartoon/Fox OUT + leaves.webm";
import tigerSelected from "../assets/cartoon/Character_tiger_selected2.png";
import tigerUnSelected from "../assets/cartoon/Character_tiger_UNselected2.png";
import tigerSideOUT from "../assets/cartoon/Tiger side OUT.webm";
import tigerCamIn from "../assets/cartoon/Tiger IN.webm";
import tigerCamOut from "../assets/cartoon/Tiger OUT.webm";
import unicornSelected from "../assets/cartoon/Character_Unicorn_Selected2.png";
import unicornUnSelected from "../assets/cartoon/Character_Unicorn_UNselected2.png";
import unicornSideOUT from "../assets/cartoon/Unicorn side OUT.webm";
import unicorCamIn from "../assets/cartoon/Unicorn IN + countdown.webm";
import unicorCamOut from "../assets/cartoon/Unicorn OUT + leaves.webm";
import homeKIDS from "../assets/cartoon/Home_KIDS.png";

const buttonNames = [
  {
    imgSelected: foxSelected,
    imgUnSelected: foxUnSelected,
    name: "fox",
    top: "50%",
    left: "5%",
    status: false,
    effect: foxSideOUT,
    effectOut: "70%",
    takeIn: foxCamIn,
    takeOut: foxCamOut
  },
  {
    imgSelected: tigerSelected,
    imgUnSelected: tigerUnSelected,
    name: "tiger",
    top: "65%",
    left: "28%",
    status: false,
    effect: tigerSideOUT,
    effectOut: "70%",
    takeIn: tigerCamIn,
    takeOut: tigerCamOut
  },
  {
    imgSelected: unicornSelected,
    imgUnSelected: unicornUnSelected,
    name: "unicorn",
    top: "50%",
    left: "55%",
    status: false,
    effect: unicornSideOUT,
    effectOut: "70%",
    takeIn: unicorCamIn,
    takeOut: unicorCamOut
  }
];

function MenuChart({ handlePage, selectedUser }) {
  const [buttons, setButtons] = useState(buttonNames);
  const effectRef = useRef(null);
  const handleClick = (index) => {
    const newButtons = buttons.map((button, i) => ({
      ...button,
      status: i === index ? !button.status : false
    }));

    setButtons(newButtons);
  };

  useEffect(() => {
    if (!effectRef?.current) return;
    const video = effectRef.current;
    video.play();
  }, [buttons]);
  const handleTake = () => {
    const selected = buttons.filter((row) => row.status);
    if (selected.length > 0) {
      selectedUser(selected[0]);
      handlePage("camShot");
    }
  };

  return (
    <div>
      <img
        src={bgKids}
        alt="bgKids"
        style={{ width: "100%", height: "100%" }}
      />
      <img
        src={choose}
        alt="choose"
        style={{
          width: "80%",
          position: "absolute",
          zIndex: 1,
          top: "20%",
          left: "10%"
        }}
      />
      <img
        src={takePhoto}
        alt="takePhoto"
        style={{
          width: "50%",
          position: "absolute",
          zIndex: 1,
          top: "40%",
          left: "28%"
        }}
        onClick={handleTake}
      />

      {buttons.map((row, index) => (
        <div key={row.name} className="testeRow">
          <img
            src={row.status ? row.imgSelected : row.imgUnSelected}
            alt={row.name}
            onClick={() => handleClick(index)}
            style={{
              width: "40%",
              position: "absolute",
              zIndex: 1,
              top: row.top,
              left: row.left
            }}
          />
          {row.status && (
            <video
              ref={effectRef}
              src={row.effect}
              autoPlay
              muted
              style={{
                width: "40%",
                position: "absolute",
                zIndex: 1,
                top: row.effectOut,
                left: 0
              }}
            />
          )}
        </div>
      ))}
      <img
        src={homeKIDS}
        alt="homeKIDS"
        style={{
          position: "absolute",
          top: "85%",
          left: "70%",
          width: "20%"
        }}
        onClick={() => handlePage("home")}
      />
    </div>
  );
}

export { MenuChart };
