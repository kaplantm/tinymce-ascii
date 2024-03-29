import { Editor } from "@tinymce/tinymce-react";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

const TinyEditorView = forwardRef(
  ({ init, ...restProps }: ComponentProps<typeof Editor>, ref: ForwardedRef<unknown>) => {
    return (
      <>
        <Editor
          ref={ref}
          apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
          init={{
            height: window.innerHeight * 0.9,
            width: window.innerWidth * 0.9,
            menubar: false,
            statusbar: false,
            ...init,
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor fontfamily fontsize | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | " +
              init?.toolbar,
            // content_style:
            //   "body { font-family:Courier New,monospace,sans-serif; font-size:8px; line-height: 4px; letter-spacing:-1px; text-align:center; font-weight:800; white-space:nowrap }",
          }}
          {...restProps}
        />
        {/* <button onClick={log}>test</button> */}
      </>
    );
  }
);

export default TinyEditorView;
