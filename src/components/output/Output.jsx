import React, { useState, useEffect, useRef } from "react";
import styles from "./output.module.css";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";

import exportAsImage from "../../utils/exportAsImage";

import frame from "./../../assets/frame.png";

export default function Output({ capturedImg, setShowComponent }) {
  const printRef = useRef();
  const [imgToPrint, setImgToPrint] = useState();

  console.log(printRef.current);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  function printDivAsImage() {
    // Get the content of the div
    var content = document.getElementById("contentToPrint");

    // Use html2canvas to render the div to a canvas with a higher DPI for better resolution
    html2canvas(content, {
      scale: 3, // Increase the scale factor for better resolution (adjust as needed)
      useCORS: true, // To handle external resources (if any)
    }).then(function (canvas) {
      // Set the desired aspect ratio for the printed image (height = 6 and width = 4)
      var desiredWidth = 1200; // 4:6 ratio width (higher resolution)
      var desiredHeight = 1800; // 4:6 ratio height (higher resolution)

      // Resize the canvas to the desired aspect ratio (4:6 ratio)
      var resizedCanvas = document.createElement("canvas");
      var ctx = resizedCanvas.getContext("2d");
      resizedCanvas.width = desiredWidth;
      resizedCanvas.height = desiredHeight;

      // Scale the original canvas content to fit the new aspect ratio (4:6 ratio)
      ctx.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);

      // Create an image element from the resized canvas
      var imgData = resizedCanvas.toDataURL("image/png");

      // Open a new print window
      var printWindow = window.open("", "", "height=500, width=500");
      printWindow.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow.document.write('<img src="' + imgData + '" width="100%">');
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    });
  }

  return (
    <div className={`flex-col-center ${styles.Output}`}>
      <h1 className="h1Txt">Print It Out</h1>

      <div
        ref={printRef}
        id="contentToPrint"
        className={`flex-row-center ${styles.outputImgContainer}`}
      >
        <div className={`flex-row-center ${styles.frame}`}>
          <img src={frame} alt="frame" />
        </div>

        <div className={`flex-row-center ${styles.capturedImage}`}>
          <img src={capturedImg} alt="captured-img" />
        </div>
      </div>

      <div className={`flex-col-center ${styles.footer}`}>
        <button
          onClick={() =>
            exportAsImage(printRef.current, "image-" + new Date().getTime())
          }
          className="btn"
        >
          Download
        </button>
        <button onClick={printDivAsImage} className="btn">
          Print
        </button>
        <button onClick={() => setShowComponent("camera")} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
}
