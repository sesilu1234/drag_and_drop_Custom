'use client'

import { useState, MouseEvent, useEffect } from "react";

export default function PiledSquares_2() {

const [isMouseDown, setSensorDown] = useState<boolean>(false);



  const squares: string[] = [
    "bg-black/30",
    "bg-red-500",
    "bg-black/30",
    "bg-green-500",
    "bg-black/30",
    "bg-amber-500",
    "bg-black/30",
    "bg-blue-500",
    "bg-black/30",
    "bg-yellow-500",
    "bg-black/30",
  ];

  const [topMeasure, setTopMeasure] = useState<number>(0);

  const [notSquare, setnotSquare] = useState<number|null>(null);
  const [showShadow, setshowShadow] = useState<number|null>(null);


const handleDrag = (id: number) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  

    setnotSquare(id);

};


useEffect(() => {
  if (notSquare !== null && showShadow !== null) {
    setSensorDown(true);
  }
}, [notSquare, showShadow]);


  return (
    <div className="relative flex flex-col gap-0">
      {squares.map((color, index) => {


       
   

        return index % 2 !== 0 ? (

          index !== notSquare ? (
          <div
            key={index}
            id={`square-${index}`}
            className={`w-[130px] h-[130px] ${notSquare === index ? "opacity-20 absolute" : ""} ${color}`}
            style={notSquare === index ? { top: 150 } : {}}

            onMouseDown={handleDrag(index)}
          ></div>) : (<div key={index} className={"w-full bg-black/30 h-[130px]"} ></div> )
        ) : (
          <div
        key={index}
              className={`w-full bg-black/30 ${showShadow === index ? "h-[130px]" : "h-0"}
              
               ${isMouseDown === true ? "transition-[height] duration-500" : ""}
              `}

            ></div>




          
        );
      })}

{notSquare != null && (
  <div
    className={`w-[130px] h-[130px] opacity-20 absolute ${squares[notSquare!]}`}
    style={{ top: topMeasure }}
  ></div>
)}

    </div>
  );
}
