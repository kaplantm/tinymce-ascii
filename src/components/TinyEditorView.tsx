import { Editor } from "@tinymce/tinymce-react";
import { ComponentProps } from "react";

const TinyEditorView = ({ ...restProps }: ComponentProps<typeof Editor>) => {
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
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
          // content_style:
          //   "body { font-family:Courier New,monospace,sans-serif; font-size:8px; line-height: 4px; letter-spacing:-1px; text-align:center; font-weight:800; white-space:nowrap }",
        }}
        {...restProps}
      />
      {/* <button onClick={log}>test</button> */}
    </>
  );
};

export default TinyEditorView;
