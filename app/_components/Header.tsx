import UserAvatar from "@/app/_features/user/UserAvatar";
import UserLinkButton from "@/app/_features/user/UserLinkButton";
import { getUserData } from "@/app/_lib/data-services";
import DropDown from "./DropDown";
import MiniLogo from "./MiniLogo";
import Notification from "./Notification";
import ThemeButton from "./ThemeButton";

async function Header() {
  const { name, avatar } = await getUserData();

  return (
    <header className="sticky top-0 z-10 sm:relative bg-containerContrast text-headContrast py-3 sm:py-2 px-4 border-b border-borderContrast flex items-center justify-between sm:justify-end gap-6 capitalize text-xl sm:text-2xl lg:text-3xl primaryTransition">
      <DropDown />
      <MiniLogo />

      <nav className="flex items-center gap-5 sm:gap-6 lg:gap-7 [&>*]:hover:text-hover">
        <UserLinkButton name={name}>
          <UserAvatar name={name} avatar={avatar} type="secondary" />
        </UserLinkButton>
        <Notification />
        <ThemeButton />
      </nav>
    </header>
  );
}

export default Header;
