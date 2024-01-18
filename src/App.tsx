import { useRef } from "react";
import "./App.css";
import testImage from "./assets/egg.jpg";
import TinyEditorView from "./components/TinyEditorView";
import { useAsciiImage } from "./hooks/useAsciiImage";

function App() {
  const frame = testImage;
  const canvasRef = useRef(null);
  const { ascii, height = 300, width = 300 } = useAsciiImage(frame, canvasRef);
  // const ascii = `<pre>foo \n food?</pre>`;
  console.log({ ascii });
  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* {ascii ? <TinyEditorView copy={`<pre>${ascii}</pre>`} height={height * 2} width={width * 2} /> : "Loading..."} */}

      {ascii ? <TinyEditorView copy={`<pre>${ascii}</pre>`} /> : "Loading..."}

      {/* <canvas ref={canvasRef} /> */}
    </div>
  );
}

export default App;
