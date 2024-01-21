// App.js

import { forwardRef, useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "./painter.css";

const Painter = forwardRef((props, canvasRef) => {
  // const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;

    // ctx.strokeStyle = "hsla(351, 100%, 41%, 0.22)";
    ctx.lineWidth = lineWidth;
  }, [lineColor, lineOpacity, lineWidth, canvasRef]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    // ctxRef.globalAlpha = lineOpacity
    // ctxRef.current.strokeStyle = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
;
    ctxRef.current.stroke();
  };

  const clearCanvas = () => {
    console.log("***here");
 
    ctxRef.current.globalAlpha = 1;
    ctxRef.current.fillStyle = "white";
    ctxRef.current.lineWidth = lineWidth;
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.globalAlpha = lineOpacity;
  };

  return (
    <div className="draw-area">
      <Menu
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        setLineOpacity={setLineOpacity}
        lineWidth={lineWidth}
        lineColor={lineColor}
        lineOpacity={lineOpacity}
        clearCanvas={clearCanvas}
      />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={400}
        height={400}
      />
    </div>
  );
});

export default Painter;
