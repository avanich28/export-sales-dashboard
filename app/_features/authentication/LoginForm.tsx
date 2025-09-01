"use client";

import BottomForm from "@/app/_components/BottomForm";
import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import SubmitButton from "@/app/_components/SubmitButton";
import { logInAction } from "@/app/_lib/actions";
import { type FormError } from "@/app/_utils/types";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: FormError = {
  error: false,
};

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    logInAction,
    initialState
  );

  useEffect(
    function () {
      if (state.error && state.message) toast.error(state.message);
    },
    [state]
  );

  return (
    <FormBox name="login" type="secondary" action={formAction}>
      <FormRow label="name">
        <Input type="text" name="name" isPending={isPending} />
      </FormRow>
      <FormRow label="password">
        <Input type="password" name="password" isPending={isPending} />
      </FormRow>
      <SubmitButton>Submit</SubmitButton>
      <BottomForm href="/signup" text="Sign up">
        Don&apos;t have an account?
      </BottomForm>
    </FormBox>
  );
}

export default LoginForm;
