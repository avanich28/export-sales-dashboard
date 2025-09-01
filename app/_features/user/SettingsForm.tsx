"use client";

import Button from "@/app/_components/Button";
import FileInput from "@/app/_components/FileInput";
import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import SubmitButton from "@/app/_components/SubmitButton";
import UserAvatar from "@/app/_features/user/UserAvatar";
import {
  resetAvatar,
  updateAvatar,
  updatePassword,
  updateUsername,
} from "@/app/_lib/actions";
import { type FormError } from "@/app/_utils/types";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

// FIXME
type UsernameProp = {
  name: string | undefined;
};

const initialStateUpdateAvatar: FormError = {
  error: false,
};

const initialStateUpdateUsername: FormError = {
  error: false,
};

const initialStateUpdatePassword: FormError = {
  error: false,
};

function UpdateAvatarForm({ name, avatar }) {
  const [state, formAction, isPending] = useActionState(
    updateAvatar,
    initialStateUpdateAvatar
  );

  useEffect(
    function () {
      if (state.error && state.message) toast.error(state.message);
    },
    [state]
  );

  return (
    <FormBox name="change your avatar" action={formAction}>
      <UserAvatar name={name} avatar={avatar} />
      <FormRow label="image">
        <FileInput name="avatar" isPending={isPending} />
      </FormRow>
      <div className="flex justify-end gap-2 sm:gap-3 lg:gap-4">
        <Button
          btnType="button"
          color="green"
          onClick={async () => await resetAvatar(avatar)}
        >
          Reset
        </Button>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </FormBox>
  );
}

function UpdateUsernameForm({ name }: UsernameProp) {
  const [state, formAction, isPending] = useActionState(
    updateUsername,
    initialStateUpdateUsername
  );

  useEffect(
    function () {
      if (state.error && state.message) toast.error(state.message);
    },
    [state]
  );

  return (
    <FormBox name="change your name" action={formAction}>
      <FormRow label="name">
        <Input
          name="name"
          defaultValue={name ? name : ""}
          isPending={isPending}
          maxLength={10}
        />
      </FormRow>
      <SubmitButton>Submit</SubmitButton>
    </FormBox>
  );
}

function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialStateUpdatePassword
  );

  useEffect(
    function () {
      if (state.error && state.message) toast.error(state.message);
    },
    [state]
  );

  return (
    <FormBox name="change your password" action={formAction}>
      <FormRow label="password">
        <Input
          type="password"
          name="password"
          isPending={isPending}
          minLength={4}
          maxLength={10}
        />
      </FormRow>
      <FormRow label="password confirm">
        <Input type="password" name="passwordConfirm" isPending={isPending} />
      </FormRow>
      <SubmitButton>Submit</SubmitButton>
    </FormBox>
  );
}

function SettingsForm({ userData }) {
  const { name, avatar } = userData;

  return (
    <>
      <UpdateAvatarForm name={name} avatar={avatar} />
      <UpdateUsernameForm name={name} />
      <UpdatePasswordForm />
    </>
  );
}

export default SettingsForm;
