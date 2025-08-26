"use client";

import { useState, useRef, useEffect } from "react";
import { HandGrab } from 'lucide-react';



const CONTAINER_WIDTH = 130;

const CONTAINER_HEIGHT = 130;

export default function PiledSquares_4() {
  const [topMeasure, setTopMeasure] = useState<number>(0);
  const prevColor = useRef<string>("");

  const [squares, setSquares] = useState<string[]>([
    "bg-black/30",
    "bg-purple-500",
    "bg-black/30",
    "bg-pink-500",
    "bg-black/30",
    "bg-teal-500",
    "bg-black/30",
    "bg-indigo-500",
    "bg-black/30",
    "bg-lime-500",
    "bg-black/30",
  ]);


  const squaresLength = squares.length;

  const [notSquare, setNotSquare] = useState<number | null>(null);

  const [activeShadow, setActiveShadow] = useState<number | null>(null);

  const [transitionActive, setTransitionActive] = useState<boolean>(false);

  const handleDrag = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    document.body.classList.add("cursor-grabbing");

    setActiveShadow(id);

    setNotSquare(id);
    prevColor.current = squares[id];

    setSquares((prev) => prev.map((sq, i) => (i === id ? "bg-black/30" : sq)));

    const startY = e.clientY;
    const iniPosition = (130 * (id - 1)) / 2;

    setTopMeasure(iniPosition);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setTopMeasure(iniPosition + (moveEvent.clientY - startY));

      const shadowRange = Math.floor((moveEvent.clientY - startY + 65) / 130);



      if (shadowRange === 0) {
        setActiveShadow(id);
      } else if (shadowRange > 0) {
        const shadowNow = id + 1 + shadowRange * 2;

        if (shadowNow >= squaresLength) {

          if (id === squaresLength - 2) { setActiveShadow(id); }
          else { setActiveShadow(squaresLength - 1); }
        } else setActiveShadow(shadowNow);
      } else if (shadowRange < 0) {
        const shadowNow = id - 1 + shadowRange * 2;



        if (shadowNow < 0) {


          if (id === 1) { setActiveShadow(id); }

          else { setActiveShadow(0); }
        } else setActiveShadow(shadowNow);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener(
      "mouseup",
      () => {
        window.removeEventListener("mousemove", handleMouseMove);
        setNotSquare(null);
        setSquares((prev) =>
          prev.map((sq, i) => (i === id ? prevColor.current! : sq))
        );
        document.body.classList.remove("cursor-grabbing");
      },
      { once: true }
    );
  };

  useEffect(() => {
    if (notSquare != null) {
      setTransitionActive(true);
    }
  }, [notSquare]);

  return (
    <div className="relative flex flex-col gap-0">
      {squares.map((color, index) => {
        let content = null;

        if (index % 2 === 1) {
          content =
            notSquare !== index ? (
              <div
                key={index}
                className={`w-[130px] h-[130px] flex justify-center items-center ${color} cursor-grab`}
                onMouseDown={handleDrag(index)}

                

              >  
              
              <HandGrab/>              
              
              </div> 
            ) : (
              <div
                key={index}
                className={`w-full bg-black/30 ${activeShadow === index ? "h-[130px] border-0 border-gray-500": "h-[0px]"
                  } ${transitionActive
                    ? "transition-[height] duration-3350 ease-in-out"
                    : ""
                  }`}
              />
            );
        } else if (
          notSquare != null &&
          !(notSquare === index - 1 || notSquare === index + 1)
        ) {
          content = (
            <div
              key={index}
              className={`w-full bg-black/30 transition-[height] duration-3350 ease-in-out ${activeShadow === index ? "h-[130px] border-0 border-gray-500": "h-[0px]"
                }`}
            />
          );
        }

        return content;
      })}

      {notSquare != null && (
        <div
          className={`w-[130px] h-[130px] absolute opacity-50 flex justify-center items-center ${prevColor.current}`}
          style={{ top: topMeasure }}
        >  
              
              <HandGrab/>              
              
              </div> 
      )}
    </div>
  );
}
