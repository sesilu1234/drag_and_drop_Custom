import Image from "next/image";



import PiledSquares from "./square_piled";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-8 p-2">
      <h1 className="text-sm font-semibold mb-4 mt-16">You can Drag and Drop Me!</h1>
      <PiledSquares />
    </div>
  );
}
     

