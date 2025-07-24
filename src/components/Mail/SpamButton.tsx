import React from "react";
import Image from "next/image";
import HeaderBaseButton from "./HeaderBaseButton";

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SpamButton({ ...props }: PropTypes) {
  return (
    <HeaderBaseButton {...props}>
      <Image src="/icons/icon-spam.webp" alt="spam" width={20} height={20} />
    </HeaderBaseButton>
  );
}
