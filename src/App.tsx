import { useRef } from "react";
import "./App.css";
import testImage from "./assets/egg.jpg";
import TinyEditorView from "./components/TinyEditorView";
import { useAsciiImage } from "./hooks/useAsciiImage";

function App() {
  const frame = testImage;
  const canvasRef = useRef(null);
  const { ascii, height, width } = useAsciiImage(frame, canvasRef);

  console.log({ ascii });
  return (
    <div>
      {/* <canvas ref={canvasRef} style={{ display: "none" }} /> */}
      {/* {ascii ? <TinyEditorView copy={ascii} height={height} width={width} /> : "Loading..."} */}

      {ascii ? <TinyEditorView copy={ascii}  /> : "Loading..."}

      <canvas ref={canvasRef}  />
    </div>
  );
}

export default App;
