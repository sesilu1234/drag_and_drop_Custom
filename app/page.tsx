import Image from "next/image";

import PiledSquares_4 from "./square_piled_4";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-24 p-6">
      <h1 className="text-2xl font-semibold mb-4 mt-32">You can Drag and Drop Me!</h1>

     
      <PiledSquares_4 />
    </div>
  );
}
