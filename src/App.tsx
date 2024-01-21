import { ChangeEventHandler, useEffect, useCallback, useRef, useState } from "react";
import "./App.css";
import TinyEditorView from "./components/TinyEditorView";
import { Editor } from "tinymce";
import { srcToAscii } from "./lib/srcToAscii";
import { textToSrc } from "./lib/textToSrc";
import Painter from "./components/Painter";
import { defaultAsciiOptions, imageDataToAscii } from "./lib/imageDataToAscii";
import { getScaledImageData } from "./lib/srcToImageData";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const painterRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tinyEditorRef = useRef<any>(null);
  const [ascii, setAscii] = useState<string | null>(null);

  const updateTextContent = useCallback(async () => {
    if (tinyEditorRef.current?.editor && ascii) {
      tinyEditorRef.current.editor.insertContent(ascii);
      setAscii(null);
    }
  }, [ascii]);

  useEffect(() => {
    updateTextContent();
  }, [updateTextContent]);

  const onFinishDrawing = useCallback(async () => {
    console.log("***onFinishDrawing")
    const ctx = canvasRef.current.getContext("2d");
    console.log("***onFinishDrawing1", ctx)
    const imageData = getScaledImageData(painterRef.current, canvasRef.current, ctx);

    console.log("***onFinishDrawing2", imageData)
    const newAscii = imageDataToAscii(imageData);

    console.log("***onFinishDrawin3g", newAscii)
    setAscii(newAscii);
  }, []);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const files = event?.target?.files || [];
    const file = files[0];
    const src = file ? URL.createObjectURL(file) : null;
    const newAscii = await srcToAscii(src, canvasRef);
    setAscii(newAscii);
  };

  const setupTinyEditor = (editor: Editor) => {
    editor.ui.registry.addButton("ascii", {
      text: "◕‿◕",
      onAction: async (_) => {
        const selectionObj = tinyEditorRef.current.editor.selection;
        const selectedText = selectionObj.getContent();
        if (selectedText) {
          const src = await textToSrc(selectedText);
          const newAscii = await srcToAscii(src, canvasRef, { scale: 1, maxDimension: null, fontSize: 10 });
          setAscii(newAscii);
        } else {
          fileInputRef?.current?.click();
        }
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} ref={fileInputRef} style={{ display: "none" }} />
      {/* <canvas ref={canvasRef} style={{ display: "none" }} /> */}
      <canvas ref={canvasRef} />
      <TinyEditorView init={{ setup: setupTinyEditor, toolbar: "ascii" }} ref={tinyEditorRef} />
      <Painter ref={painterRef} onFinishDrawing={onFinishDrawing} />
    </div>
  );
}

export default App;
