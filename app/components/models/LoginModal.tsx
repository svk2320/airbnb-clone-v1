"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

import Model from "./Model";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModal";
import Heading from "../Heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const foooterContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outlined
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outlined
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
                text-neutral-500
                text-center
                mt-4
                font-light
            "
      >
        <div className=" flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={foooterContent}
    />
  );
};

export default LoginModal;
