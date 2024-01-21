const textAsSvgId = "text-to-svg";
const textAsSvgContainerId = "text-to-svg-container";
const textAsHtmlContainerId = "text-as-html-container";

const getOrCreateElement = (id: string, append = true, type = "div") => {
  let el = document.getElementById(id);
  if (el) return el;
  el = document.createElement(type);
  el.id = id;
  if (append) document.body.appendChild(el);
  return el;
};

const getTextHtml = (text: string) =>
  `<div xmlns="http://www.w3.org/1999/xhtml" style="background:white;color:black"><pre>${text}</pre></div>`;

const renderTextAsHtml = (text: string) => {
  const contentEl = getOrCreateElement(textAsHtmlContainerId, true);
  contentEl.ariaHidden = "true";
  contentEl.innerHTML = getTextHtml(text);
  return contentEl;
};

const getSvgWithForeignObject = (html: string) => `
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="126px"
    height="126px"
    xml:space="preserve"
    id=${textAsSvgId}
  >
    <foreignObject width="200" height="200" classname="svg-text-container">
    ${html}
    </foreignObject>
  </svg>
`;

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

  const svgContainer = getOrCreateElement(textAsSvgContainerId, true, "svg"); // TODO: do i need to append?
  svgContainer.innerHTML = getSvgWithForeignObject(textAsHtml.innerHTML);

  const svgElement = document.getElementById(textAsSvgId);
  console.log("***svgsvgElement", { svgElement, svgContainer });
  if (!svgElement) return null;
  const elementAsString = new XMLSerializer().serializeToString(svgElement);
  const base64 = window.btoa(unescape(encodeURIComponent(elementAsString)));
  const src = `data:image/svg+xml;base64,${base64}`;

  return src;
};
