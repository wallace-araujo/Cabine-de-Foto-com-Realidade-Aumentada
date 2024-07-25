import React, { useState } from "react";
import { MenuChart } from "./components/MenuChart";
import { HomePage } from "./components/HomePage";
import { CamShot } from "./components/CamShot";
import { FinalPage } from "./components/FinalPage";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL
} from "firebase/storage";
import "./photoshoot.css";

function App() {
  const idPhoto = uuidv4();
  const today = new Date().toLocaleDateString();
  const [pageUser, setPageUser] = useState("home");
  const [characterSelected, setCharacterSelected] = useState("");
  const [photoUser, setPhotoUser] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);
  const [inLoading, setInLoading] = useState(false);

  const handleClick = (type) => {
    if (type === "endUser") {
      handleUpload();
    }
    setPageUser(type);
  };

  const handleUpload = async () => {
    setInLoading(true)
    const newToday = today.replace(/\//g, "-");
    const imageUpload = `takePhoto/${newToday}/${idPhoto}`;
    const storage = getStorage();
    const storageRef = ref(storage, imageUpload);
    await uploadString(storageRef, photoUser, "data_url");
    const url = await getDownloadURL(ref(storage, imageUpload));
    setUrlPhoto(url);
    setInLoading(false)
  };
  return (
    <>
      {pageUser === "home" && <HomePage handlePage={handleClick} />}

      {pageUser === "menu" && (
        <MenuChart
          handlePage={handleClick}
          selectedUser={setCharacterSelected}
        />
      )}
      {pageUser === "camShot" && (
        <CamShot
          handlePage={handleClick}
          setPhotoUser={setPhotoUser}
          characterSelected={characterSelected}
        />
      )}

      {pageUser === "endUser" && (
        <FinalPage handlePage={handleClick} urlPhoto={urlPhoto} inLoading={inLoading} />
      )}
    </>
  );
}

export default App;
