// Menu.js

import React from "react";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, clearCanvas, lineWidth, lineColor, lineOpacity }) => {
  return (
    <div className="Menu">
      <div>
        <label>Brush Color</label>
        <input
          type="color"
          value={lineColor}
          onChange={(e) => {
            setLineColor(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Brush Width </label>
        <input
          type="range"
          min="3"
          max="20"
          value={lineWidth}
          onChange={(e) => {
            setLineWidth(e.target.value);
          }}
        />
      </div>
      {/* would probably need to add logic like this to support this (clearing canvas and remember/redrawing paths)
      https://jsfiddle.net/4naMG/3/
      https://stackoverflow.com/questions/23247356/html5-canvas-transparency-for-all-overlapping-content
       */}
      {/* <div>
        <label>Brush Opacity</label>
        <input
          type="range"
          step={.01}
          min=".05"
          max=".4"
          value={lineOpacity}
          onChange={(e) => {
            setLineOpacity(e.target.value);
          }}
        />
      </div> */}
      <div>
        <button onClick={clearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default Menu;
