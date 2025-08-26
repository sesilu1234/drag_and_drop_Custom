'use client'

import { useState, useRef } from "react";

export default function PiledSquares_3() {
  const [topMeasure, setTopMeasure] = useState<number>(0);
  const prevColor = useRef<string>("");

  const [squares, setSquares] = useState<string[]>([
    "bg-red-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-yellow-500"
  ]);

  const [notSquare, setNotSquare] = useState<number | null>(null);

  const handleDrag = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setNotSquare(id);
    prevColor.current = squares[id]; // save original color

    // update color of dragged square
    setSquares(prev =>
        
      prev.map((sq, i) => (i === id ? "bg-black/30" : sq))
    );

    // store offset so square doesn’t jump
    const startY = e.clientY;
    const iniPosition = 130 * id;

    setTopMeasure(iniPosition);

    // define mousemove handler
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setTopMeasure(iniPosition + (moveEvent.clientY - startY));
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", () => {
  window.removeEventListener("mousemove", handleMouseMove);
  setNotSquare(null);
  setSquares(prev =>
    prev.map((sq, i) => (i === id ? prevColor.current! : sq))
  );
}, { once: true });


   
    
  };

  setSquares(prev => {
  const beforeX = prev.slice(0, id).flatMap(e => ["bg-black/30", e]);
  const afterX = prev.slice(id + 1).flatMap(e => [e, "bg-black/30"]);
  
  return [...beforeX, "bg-black/30", ...afterX];
});







  


  return (
    <div className="relative flex flex-col gap-0">
      {squares.map((color, index) => (
        <div
          key={index}
          className={`w-[130px] h-[130px] ${color}`}
          onMouseDown={handleDrag(index)}
        />
      ))}

      {notSquare != null && (
        <div
          className={`w-[130px] h-[130px] absolute opacity-50 ${prevColor.current}`}
          style={{ top: topMeasure }}
        />
      )}
    </div>
  );
}
