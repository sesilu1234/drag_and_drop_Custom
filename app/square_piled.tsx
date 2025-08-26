"use client";

import { useState, useRef, useEffect } from "react";
import { HandGrab } from "lucide-react";

const CONTAINER_WIDTH = 130;

const CONTAINER_HEIGHT = 130;

export default function PiledSquares() {
  const [topMeasure, setTopMeasure] = useState<number>(0);
  const prevColor = useRef<string>("");

  type Square = {
    id: number;
    color: string;
  };

  const [squares, setSquares] = useState<Square[]>([
    { id: 0, color: "bg-black/30" },
    { id: 1, color: "bg-purple-500" },
    { id: 2, color: "bg-black/30" },
    { id: 3, color: "bg-pink-500" },
    { id: 4, color: "bg-black/30" },
    { id: 5, color: "bg-teal-500" },
    { id: 6, color: "bg-black/30" },
    { id: 7, color: "bg-indigo-500" },
    { id: 8, color: "bg-black/30" },
    { id: 9, color: "bg-lime-500" },
    { id: 10, color: "bg-black/30" },
  ]);

  function changeColorPos(pos: number, to: number) {
    const newList = [...squares]; // copy array if using React state
    const moved = newList.splice(pos, 2); // remove element
   // insert at new position
    newList.splice(to, 0, ...moved);

    return newList;
  }

  const squaresLength = squares.length;

  const [notSquare, setNotSquare] = useState<number | null>(null);

  const [activeShadow, setActiveShadow] = useState<number | null>(null);

  const [transitionActive, setTransitionActive] = useState<boolean>(false);

  const handleDrag = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    document.body.classList.add("cursor-grabbing");

    setActiveShadow(id);

    setNotSquare(id);
    prevColor.current = squares[id].color;

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
          if (id === squaresLength - 2) {
            setActiveShadow(id);
          } else {
            setActiveShadow(squaresLength - 1);
          }
        } else setActiveShadow(shadowNow);
      } else if (shadowRange < 0) {
        const shadowNow = id - 1 + shadowRange * 2;

        if (shadowNow < 0) {
          if (id === 1) {
            setActiveShadow(1);
          } else {
            setActiveShadow(0);
          }
        } else setActiveShadow(shadowNow);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener(
      "mouseup",
      (upEvent) => {
        window.removeEventListener("mousemove", handleMouseMove);
        setNotSquare(null);

        const finalShadowRange = Math.floor(
          (upEvent.clientY - startY + 65) / 130
        );

        const finalShadowPos = id + 2 * finalShadowRange;

        if (finalShadowPos < 1) {
          setSquares(changeColorPos(id, 1));
        } else {
          setSquares(changeColorPos(id, finalShadowPos));
        }

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
      {squares.map((colorCom, index) => {
        let content = null;

        if (index % 2 === 1) {
          content =
            notSquare !== index ? (
              <div
                key={colorCom.id}
                className={`w-[130px] h-[130px] flex justify-center items-center ${colorCom.color} cursor-grab`}
                onMouseDown={handleDrag(index)}
              >
                <HandGrab />
              </div>
            ) : (
              <div
                key={colorCom.id}
                className={`w-full bg-black/30 ${
                  activeShadow === index
                    ? "h-[130px] border-0 border-gray-500"
                    : "h-[0px]"
                } ${
                  transitionActive
                    ? "transition-[height] duration-250 ease-in-out"
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
              key={colorCom.id}
              className={`w-full bg-black/30 transition-[height] duration-250 ease-in-out ${
                activeShadow === index
                  ? "h-[130px] border-0 border-gray-500"
                  : "h-[0px]"
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
          <HandGrab />
        </div>
      )}
    </div>
  );
}
