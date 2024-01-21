const textAsSvgId = "text-to-svg";
const textAsSvgContainerId = "text-to-svg-container";
const textAsHtmlContainerId = "text-as-html-container";

const getOrCreateElement = (id: string, type = "div") => {
  let el = document.getElementById(id);
  if (el) return el;
  el = document.createElement(type);
  el.id = id;
  document.body.appendChild(el);
  return el;
};

const getHiddenContainer = () => {
  const hiddenContainer = getOrCreateElement("hidden-svg-generator");
  hiddenContainer.style.visibility = "hidden";
  return hiddenContainer;
};

const getOrCreateElementInHiddenContainer = (id: string, type = "div") => {
  const hiddenContainer = getHiddenContainer();
  let el = document.getElementById(id);
  if (el) return el;
  el = document.createElement(type);
  el.id = id;
  hiddenContainer.appendChild(el);
  return el;
};

const getTextHtml = (text: string) =>
  `<div xmlns="http://www.w3.org/1999/xhtml" style="background:white;color:black;">${text}</div>`;

const renderTextAsHtml = (text: string) => {
  const contentEl = getOrCreateElementInHiddenContainer(textAsHtmlContainerId);
  contentEl.ariaHidden = "true";
  contentEl.innerHTML = getTextHtml(text);
  return contentEl;
};

const getSvgWithForeignObject = (html: string, height: number, width: number) => `
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width=${width}
    height=${height}
    xml:space="preserve"
    id=${textAsSvgId}
  >
  <style>
    p {
      margin: 0;
      line-height: 1;
    }
  </style>
    <rect width="100%" height="100%" fill="green"/>
    <foreignObject width="100%" height="100%" classname="svg-text-container">
    ${html}
    </foreignObject>
  </svg>
`;

// Render a div with the text (display: none) that scales to fit the content
// get dimensions of the div
// render that div in an svg - use div dimensions as dimensions of svg
// call btoa to get base64 of svg
// get data url of svg (data:image/svg+xml;base64, +data)
export const textToSrc = async (text: string | null) => {
  if (!text) return null;
  const textAsHtml = renderTextAsHtml(text);
  const textAsDivBounds = textAsHtml.getBoundingClientRect();

  const svgContainer = getOrCreateElementInHiddenContainer(textAsSvgContainerId, "div"); // TODO: do i need to append?
  svgContainer.style.display = "flex";
  svgContainer.innerHTML = getSvgWithForeignObject(textAsHtml.innerHTML, textAsDivBounds.height, textAsDivBounds.width);

  const svgElement = document.getElementById(textAsSvgId);
  console.log("***svgsvgElement", { svgElement, svgContainer });
  if (!svgElement) return null;
  const elementAsString = new XMLSerializer().serializeToString(svgElement);
  const base64 = window.btoa(unescape(encodeURIComponent(elementAsString)));
  const src = `data:image/svg+xml;base64,${base64}`;

  return src;
};
