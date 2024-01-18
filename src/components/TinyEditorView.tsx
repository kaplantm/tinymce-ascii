import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RawEditorOptions } from "tinymce";

type TinyEditorViewProps = {
  copy: string;
} & RawEditorOptions;

export default function TinyEditorView({ copy, ...rawEditorOptions }: TinyEditorViewProps) {
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={copy}
        init={{
          height: window.innerHeight * 0.8,
          width: window.innerWidth * 0.8,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Courier New,monospace,sans-serif; font-size:8px; line-height: 4px; letter-spacing:-1px; text-align:center; font-weight:800; white-space:nowrap }",
          ...rawEditorOptions,
        }}
      />
      {/* <button onClick={log}>test</button> */}
    </>
  );
}
