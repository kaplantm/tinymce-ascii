import { useRef } from "react";
import "./App.css";
// import testImage from "./assets/egg.jpg";

import testImage from "./assets/test_image_half_mb copy.jpeg";
import TinyEditorView from "./components/TinyEditorView";
import { useAsciiImage } from "./hooks/useAsciiImage";

function App() {
  const frame = testImage;
  const canvasRef = useRef(null);
  const { ascii} = useAsciiImage(frame, canvasRef);
  console.log({ ascii });
  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* {ascii ? <TinyEditorView copy={`<pre>${ascii}</pre>`} /> : "Loading..."} */}

      {ascii ? <TinyEditorView copy={ascii} /> : "Loading..."}
    </div>
  );
}

export default App;
