import React, { PropsWithChildren } from "react";
import { classNames } from "@/utils/classes";
import HeaderBaseButton from "./HeaderBaseButton";

export default function RestoreButton({
  className,
  children,
  ...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <HeaderBaseButton
      className={classNames("rounded px-3 py-1.5", className)}
      {...props}
    >
      {children}
    </HeaderBaseButton>
  );
}
