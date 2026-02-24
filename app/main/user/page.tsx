import Heading from "@/app/_components/Heading";
import Logout from "@/app/_features/authentication/Logout";
import SettingsForm from "@/app/_features/user/SettingsForm";
import { getUserData } from "@/app/_lib/data-services";

export const metadata = {
  title: "User",
};

async function Page() {
  const userData = await getUserData();

  return (
    <>
      <header className="flex items-center gap-8 sm:gap-10 lg:gap-12">
        <Heading>Settings</Heading>
        <Logout />
      </header>

      <main className="w-full flex flex-col gap-2 sm:gap-4 lg:grid grid-cols-2">
        <SettingsForm userData={userData} />
      </main>
    </>
  );
}

export default Page;
