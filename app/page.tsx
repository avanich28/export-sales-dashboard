import DefaultLayout from "@/app/_components/DefaultLayout";
import LinkButton from "@/app/_components/LinkButton";
import Handshake from "@/app/_images/Handshake";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center gap-1 sm:gap-2 lg:gap-3 tracking-wider sm:tracking-widest">
        <div className="w-[100px] sm:w-[125px] lg:w-[140px] h-auto mt-[-12vh] mb-[-30px]">
          <Handshake />
        </div>
        <div className="sm:text-xl lg:text-2xl sm:font-semibold">
          Welcome to our fruits export company!
        </div>
        <div className="flex gap-3 sm:gap-4 lg:gap-5">
          <LinkButton href="/signup">sign up</LinkButton>
          <LinkButton href="/login" color="green">
            login
          </LinkButton>
        </div>
      </div>
    </DefaultLayout>
  );
}
