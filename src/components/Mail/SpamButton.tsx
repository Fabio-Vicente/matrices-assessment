import Image from "next/image";
import React from "react";
import HeaderBaseButton from "./HeaderBaseButton";

export default function SpamButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <HeaderBaseButton {...props}>
      <Image src="/icons/icon-spam.webp" alt="spam" width={20} height={20} />
    </HeaderBaseButton>
  );
}
