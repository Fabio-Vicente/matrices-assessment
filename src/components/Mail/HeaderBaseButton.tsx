import React, { PropsWithChildren } from "react";
import clsx from "clsx";

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function HeaderBaseButton({
  className,
  children,
  ...props
}: PropsWithChildren<PropTypes>) {
  return (
    <button
      className={clsx("p-2 hover:bg-gray-100 rounded-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
