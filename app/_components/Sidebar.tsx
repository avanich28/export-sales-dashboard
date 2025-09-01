import Footer from "./Footer";
import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";

function Sidebar() {
  return (
    <aside className="min-h-screen sm:max-h-screen sm:overflow-auto px-5 sm:px-6 lg:px-7 pt-3 bg-containerContrast border-r border-borderContrast flex flex-col justify-start gap-3 sm:gap-4 lg:gap-5 primaryTransition">
      <Logo />
      <SidebarLinks />
      <Footer addClassName="mt-auto" />
    </aside>
  );
}

export default Sidebar;
