import { ChangeEventHandler, useEffect, useCallback, useRef, useState } from "react";
import "./App.css";
import TinyEditorView from "./components/TinyEditorView";
import { Editor } from "tinymce";
import { srcToAscii } from "./lib/srcToAscii";
import { textToSrc } from "./lib/textToSrc";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* <canvas ref={canvasRef} /> */}
      <TinyEditorView init={{ setup: setupTinyEditor, toolbar: "ascii" }} ref={tinyEditorRef} />
    </div>
  );
}

export default App;
