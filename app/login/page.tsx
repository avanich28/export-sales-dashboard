import DefaultLayout from "@/app/_components/DefaultLayout";
import LoginForm from "@/app/_features/authentication/LoginForm";

export const metadata = {
  title: "Login",
};

function Page() {
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
}

export default Page;
