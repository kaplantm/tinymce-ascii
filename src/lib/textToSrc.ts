import { AsciiOptions, imageDataToAscii } from "./imageDataToAscii";
import { srcToImageData } from "./srcToImageData";

const textAsSvgId = "text-to-svg";
// const textAsHtmlContainerId = "text-as-html-container";
const textAsHtmlContentId = "text-as-html-content";

const getOrCreateElement = (id: string, append = false, type = "div") => {
  let el = document.getElementById(id);
  if (el) return el;
  el = document.createElement(type);
  if (append) document.appendChild(el);
  return el;
};

const renderTextAsHtml = (text: string) => {
  //   const containerEl = getOrCreateElement(textAsHtmlContainerId); // TODO: now do i need to append it?
  const contentEl = getOrCreateElement(textAsHtmlContentId);
  contentEl.ariaHidden = "true";
  contentEl.innerHTML = `<pre>${text}</pre>`;
  return contentEl;
  //   containerEl.appendChild(contentEl)
  //   element.style.display = "none" // TODO: now visible but offscreen? or maube visibility hidden? not sure
  //   document.appendChild(element); // TODO: now do i need to append it?
};

// const renderHTMLAsSvg = (text:string) => {
//     let element = document.getElementById(textAsSvgId);
//     if (element) return element;
//     element = document.createElement("svg");
//     element.id = textAsSvgId;
//     element.ariaHidden = "true";
//     element.innerHTML = `<pre>${text}</pre>`;
//     document.appendChild(element);
//     return element;
//   };

// Render a div with the text (display: none) that scales to fit the content
// get dimensions of the div
// render that div in an svg - use div dimensions as dimensions of svg
// call btoa to get base64 of svg
// get data url of svg (data:image/svg+xml;base64, +data)
export const textToSrc = async (text: string | null) => {
  if (!text) return null;
  const textAsHtml = renderTextAsHtml(text);
  const textAsDivBounds = textAsHtml.getBoundingClientRect();
  console.log({ textAsDivBounds, html: textAsHtml.innerHTML });

  const svgElement = getOrCreateElement(textAsSvgId, false, "svg"); // TODO: do i need to append?
  const width = `${textAsDivBounds.width}px`;
  const height = `${textAsDivBounds.height}px`;
  svgElement.style.width = width;
  svgElement.style.height = height;

  svgElement.innerHTML = `
<foreignObject width=${width} height=${height}>
    <div xmlns="http://www.w3.org/1999/xhtml">
        ${textAsHtml.innerHTML}
    </div>
</foreignObject>
`;

  const elementAsString = new XMLSerializer().serializeToString(svgElement);
  const base64 = window.btoa(unescape(encodeURIComponent(elementAsString)));
  const src = `data:image/svg+xml;base64,${base64}`;

  return src;
};
