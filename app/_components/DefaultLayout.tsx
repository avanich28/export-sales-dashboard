import { Gochi_Hand } from "next/font/google";
import Footer from "./Footer";
import Logo from "./Logo";

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const defaultStyles = {
  primary:
    "px-[3vw] pt-[3vh] w-full h-screen min-h-fit flex flex-col justify-between items-center gap-2 lg:gap-3",
};

function DefaultLayout({ children, type = "primary" }) {
  return (
    <main className={`${defaultStyles[type]}`}>
      <Logo />
      {children}
      <Footer />
    </main>
  );
}

export default DefaultLayout;
