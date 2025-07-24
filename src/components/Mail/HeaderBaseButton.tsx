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
        "p-2 hover:bg-gray-100 rounded-full text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
