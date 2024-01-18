import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import testImage from "./assets/test_image_half_mb copy.jpeg";
import TinyEditorView from "./components/TinyEditorView";
import { imageToAscii } from "./lib/imageToAscii";

function App() {
  const frame = testImage;
  const copy = imageToAscii(frame);
  return (
    <div>
      <TinyEditorView copy={copy} />
    </div>
  );
}

export default App;
