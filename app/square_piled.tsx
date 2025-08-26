
'use client'

import { useState, MouseEvent } from "react";

export default function PiledSquares() {




  const [activeSquares, setActiveSquares] = useState<number[]>([]);

  const squares: string[] = [
    "red-500",
    "green-500",
    "amber-500",
    "blue-500",
    "yellow-500",
  ];

  const handleDrag = (id: number) => (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Mark this square as active
    setActiveSquares((prev) => [...prev, id]);
    console.log("Dragging square", id);
  };

  return (
    <div className="relative flex flex-col gap-0">
      {squares.map((color, index) => {
        const id = index + 1;
        const isActive = activeSquares.includes(id);

        return (
          <div key={id} className="relative">
            <div
              id={`square-${id}`}
              className={`w-[130px] h-[130px] bg-${color} 
              ${
                isActive ? "absolute top-0 left-0" : ""
              }
              
              `}
              onMouseDown={handleDrag(id)}
            ></div>

            <div
              id={`sub-square-${id}`}
              className={`w-full bg-black/30`}
              style={{ height: isActive ? 130 : 0 }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
