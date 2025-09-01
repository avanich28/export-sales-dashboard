"use client";

import BottomForm from "@/app/_components/BottomForm";
import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import SubmitButton from "@/app/_components/SubmitButton";
import { signUpAction } from "@/app/_lib/actions";
import { type FormError } from "@/app/_utils/types";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState: FormError = {
  error: false,
};

function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  );

  useEffect(
    function () {
      if (state.error && state.message) toast.error(state.message);
    },
    [state]
  );

  return (
    <FormBox name="sign up" type="secondary" action={formAction}>
      <FormRow label="name">
        <Input name="name" isPending={isPending} maxLength={8} />
      </FormRow>
      <FormRow label="password">
        <Input
          type="password"
          name="password"
          isPending={isPending}
          minLength={4}
          maxLength={10}
        />
      </FormRow>
      <SubmitButton>Submit</SubmitButton>
      <BottomForm href="/login" text="Login">
        Already have an account?
      </BottomForm>
    </FormBox>
  );
}

export default SignUpForm;
