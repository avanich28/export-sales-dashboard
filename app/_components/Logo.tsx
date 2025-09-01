import Farmer from "@/app/_images/Farmer";
import { Gochi_Hand } from "next/font/google";

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[80px] sm:w-[105px] lg:w-[120px] h-auto">
        <Farmer />
      </div>
      <div
        className={`${gochiHand.className} my-[-8px] uppercase text-textContrast tracking-wider sm:tracking-widest text-2xl sm:text-3xl lg:text-4xl primaryTransition`}
      >
        Chao Rai
      </div>
    </div>
  );
}

export default Logo;
