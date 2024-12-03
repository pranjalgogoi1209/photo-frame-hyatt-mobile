import React, { useState } from "react";
import styles from "./app.module.css";
import { ToastContainer } from "react-toastify";

import Camera from "./components/camera/Camera";
import Output from "./components/output/Output";

export default function App() {
  const [showComponent, setShowComponent] = useState("camera");
  const [capturedImg, setCapturedImg] = useState();
  return (
    <>
      {showComponent === "camera" && (
        <Camera
          setCapturedImg={setCapturedImg}
          setShowComponent={setShowComponent}
        />
      )}

      {showComponent === "output" && (
        <Output capturedImg={capturedImg} setShowComponent={setShowComponent} />
      )}

      <ToastContainer />
    </>
  );
}
