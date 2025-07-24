import { classNames } from "@/utils/classes";
import React, { PropsWithChildren } from "react";

export default function HeaderBaseButton({
  className,
  children,
  ...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={classNames(
        "rounded-full p-2 text-sm hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
