import React, { PropsWithChildren } from "react";
import { classNames } from "@/utils/classes";

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function HeaderBaseButton({
  className,
  children,
  ...props
}: PropsWithChildren<PropTypes>) {
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
