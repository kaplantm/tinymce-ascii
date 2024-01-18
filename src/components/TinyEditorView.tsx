import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RawEditorOptions } from "tinymce";

type TinyEditorViewProps = {
  copy: string;
} & RawEditorOptions;

export default function TinyEditorView({ copy, ...rawEditorOptions }: TinyEditorViewProps) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  console.log({key: import.meta.env.VITE_TINY_MCE_API_KEY})
  return (
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={copy}
        init={{
          height: 500,
          width: 500,
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
          content_style: "body { font-family:Courier New,monospace,sans-serif; font-size:14px }",
          ...rawEditorOptions,
        }}
      />
  );
}
