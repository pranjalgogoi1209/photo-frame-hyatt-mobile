import React, { useState, useRef } from "react";
import styles from "./camera.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";

export default function Camera({ setCapturedImg, setShowComponent }) {
  const webRef = useRef();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);

  // handle-capture
  const handleCapture = (e) => {
    if (webRef.current.getScreenshot()) {
      setIsCaptured(true);
      setImg(webRef.current.getScreenshot());
    }
  };

  // handle-retake
  const handleRetake = (e) => {
    setIsCaptured(false);
    img && setImg("");
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    // console.log("captured image submitting");
    if (img) {
      setCapturedImg(img);
      setShowComponent("output");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.Camera}`}>
      <header className={`flex-row-center ${styles.header}`}>
        <h1 className={`flex-row-center h1Txt`}>
          {isCaptured ? "Do You Like This ?" : "Capture Your Photo"}
        </h1>
      </header>

      {/* <h1>{isCaptured ? "DO YOU LIKE THIS ?" : "CAPTURE YOUR PHOTO"}</h1> */}

      <main className={`flex-row-center ${styles.main}`}>
        <div className={styles.webcamParent}>
          {img ? (
            <img
              src={img}
              alt="captured image"
              className={styles.capturedImage}
            />
          ) : (
            <Webcam
              ref={webRef}
              id={styles.webcam}
              videoConstraints={{
                facingMode: "environment",
                // aspectRatio: 4 / 6,
              }}
              forceScreenshotSourceSize={true}
            />
          )}
        </div>
      </main>

      <footer className={`flex-col-center ${styles.footer}`}>
        {isCaptured ? (
          <div className={`flex-col-center ${styles.afterCaptureBtnContainer}`}>
            <button
              onClick={(e) => handleRetake(e)}
              className="flex-row-center btn"
            >
              Retake
            </button>

            <button onClick={handleSubmit} className="flex-row-center btn">
              Submit
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => handleCapture(e)}
            className="flex-row-center btn"
          >
            Capture
          </button>
        )}
      </footer>
    </div>
  );
}
